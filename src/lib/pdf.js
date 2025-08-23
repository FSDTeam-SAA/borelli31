import PDFDocument from 'pdfkit'

export const generateMessagePdf = (messageDoc, res) => {
  const doc = new PDFDocument({ size: 'A4', margin: 50 })

  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', `attachment; filename=message-${messageDoc._id}.pdf`)

  doc.pipe(res)

  doc
    .fontSize(20)
    .text('Message Info', { align: 'center' })
    .moveDown(1)

  const table = [
    ['Full Name', messageDoc.fullName || ''],
    ['Phone Number', messageDoc.phone || ''],
    ['Email', messageDoc.email || ''],
    ['Message', messageDoc.message || ''],
  ]

  doc.fontSize(12)
  table.forEach(([label, value]) => {
    doc.font('Helvetica-Bold').text(label, { continued: true })
    doc.font('Helvetica').text(`  ${value}`)
    doc.moveDown(0.5)
  })

  doc.moveDown(1)
  doc.fontSize(10).text(`Created: ${new Date(messageDoc.createdAt).toLocaleString()}`)

  doc.end()
}

export default generateMessagePdf

export const generateAssessmentPdf = (assessmentDoc, res) => {
  const doc = new PDFDocument({ size: 'A4', margin: 50 })

  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', `attachment; filename=assessment-${assessmentDoc._id}.pdf`)

  doc.pipe(res)

  doc
    .fontSize(20)
    .text('Assessment Info', { align: 'center' })
    .moveDown(1)

  const table = [
    ['Full Name', assessmentDoc.fullName || ''],
    ['Phone Number', assessmentDoc.phone || ''],
    ['Email', assessmentDoc.email || ''],
    ['Service', (assessmentDoc.service && (assessmentDoc.service.name || assessmentDoc.service.toString())) || '']
  ]

  doc.fontSize(12)
  table.forEach(([label, value]) => {
    doc.font('Helvetica-Bold').text(label, { continued: true })
    doc.font('Helvetica').text(`  ${value}`)
    doc.moveDown(0.5)
  })

  doc.end()
}


