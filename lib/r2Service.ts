import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

export class R2Service {
  private s3Client: S3Client
  private bucketName: string

  constructor() {
    const accessKeyId = process.env.R2_ACCESS_KEY_ID
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY
    const endpoint = process.env.R2_ENDPOINT_URL
    this.bucketName = process.env.R2_BUCKET_NAME || 'fertility-ai-bucket'

    if (!accessKeyId || !secretAccessKey || !endpoint) {
      throw new Error('R2 credentials are not set in environment variables')
    }

    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: endpoint,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    })
  }

  async uploadFile(fileBuffer: Buffer, fileName: string, contentType: string): Promise<string> {
    try {
      const key = `${Date.now()}-${fileName}`
      
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: fileBuffer,
        ContentType: contentType,
      })

      await this.s3Client.send(command)
      
      // Return the URL to access the file
      return `${process.env.R2_ENDPOINT_URL}/${this.bucketName}/${key}`
    } catch (error) {
      console.error('Error uploading file to R2:', error)
      throw new Error('Failed to upload file to R2 storage')
    }
  }

  async getFile(key: string): Promise<Buffer | null> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })

      const response = await this.s3Client.send(command)
      
      if (response.Body) {
        // Convert the response body to a Buffer
        const buffer = await new Promise<Buffer>((resolve, reject) => {
          const chunks: Buffer[] = []
          // @ts-ignore
          response.Body.on('data', (chunk: Buffer) => chunks.push(chunk))
          // @ts-ignore
          response.Body.on('end', () => resolve(Buffer.concat(chunks)))
          // @ts-ignore
          response.Body.on('error', reject)
        })
        
        return buffer
      }
      
      return null
    } catch (error) {
      console.error('Error retrieving file from R2:', error)
      return null
    }
  }

  async deleteFile(key: string): Promise<boolean> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      })

      await this.s3Client.send(command)
      return true
    } catch (error) {
      console.error('Error deleting file from R2:', error)
      return false
    }
  }
}