import { google } from 'googleapis'
import fs from 'node:fs'

const CLIENT_ID = process.env.GDRIVE_CLIENT_ID
const CLIENT_SECRET = process.env.GDRIVE_CLIENT_SECRET
const REFRESH_TOKEN = process.env.GDRIVE_REFRESH_TOKEN
const PARENT_FOLDER_ID = process.env.GDRIVE_PARENT_FOLDER_ID

// Autentikasi OAuth2 User (Pakai kuota akun Google pribadi)
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
)

oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
})

const drive = google.drive({ version: 'v3', auth: oauth2Client })

export class GDriveService {
  /**
   * Membuat subfolder baru di dalam Parent Folder Google Drive
   */
  public static async createFolder(folderName: string) {
    if (!PARENT_FOLDER_ID) {
      throw new Error('GDRIVE_PARENT_FOLDER_ID belum diatur di file .env')
    }

    const fileMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [PARENT_FOLDER_ID],
    }

    const res = await drive.files.create({
      requestBody: fileMetadata,
      fields: 'id, name, webViewLink',
    })

    const folderId = res.data.id!

    // Set permission agar folder bisa dilihat
    await drive.permissions.create({
      fileId: folderId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    })

    return {
      folderId,
      webViewLink: res.data.webViewLink || `https://drive.google.com/drive/folders/${folderId}`,
    }
  }

  /**
   * Upload single image ke subfolder di Google Drive
   */
  public static async uploadFile(filePath: string, fileName: string, mimeType: string, folderId: string) {
    const fileMetadata = {
      name: fileName,
      parents: [folderId],
    }

    const media = {
      mimeType: mimeType,
      body: fs.createReadStream(filePath),
    }

    const file = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, name, webViewLink, webContentLink',
    })

    const fileId = file.data.id!

    // Set permission file publik agar bisa dipreview di frontend/web
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    })

    return {
      fileId,
      viewUrl: `https://lh3.googleusercontent.com/d/${fileId}`,
      webViewLink: file.data.webViewLink || `https://drive.google.com/file/d/${fileId}/view`,
    }
  }


  public static async deleteFileOrFolder(fileId: string) {
    try {
      await drive.files.delete({
        fileId: fileId,
      })
      return true
    } catch (error:any) {
      console.error(`Gagal menghapus file GDrive (${fileId}):`, error.message)
      return false
    }
  }

  /**
   * Mengubah nama file atau folder di Google Drive
   */
  public static async renameFolder(folderId: string, newName: string) {
    try {
      const res = await drive.files.update({
        fileId: folderId,
        requestBody: {
          name: newName,
        },
        fields: 'id, name',
      })
      return res.data
    } catch (error: any) {
      console.error(`Gagal rename folder GDrive (${folderId}):`, error.message)
      return null
    }
  }
}