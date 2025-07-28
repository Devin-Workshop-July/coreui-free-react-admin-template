import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormTextarea,
  CRow,
  CAlert,
  CSpinner,
  CListGroup,
  CListGroupItem,
  CBadge
} from '@coreui/react'

const MessageForm = () => {
  const [content, setContent] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({ show: false, message: '', color: 'success' })
  const [validated, setValidated] = useState(false)

  const API_BASE_URL = 'http://localhost:8080'

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/messages`)
      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages || [])
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    const form = event.currentTarget
    if (form.checkValidity() === false || !content.trim()) {
      setValidated(true)
      return
    }

    setLoading(true)
    setAlert({ show: false, message: '', color: 'success' })

    try {
      const response = await fetch(`${API_BASE_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: { content: content.trim() } }),
      })

      if (response.ok) {
        const data = await response.json()
        setAlert({
          show: true,
          message: 'Message sent successfully!',
          color: 'success'
        })
        setContent('')
        setValidated(false)
        fetchMessages()
      } else {
        const errorData = await response.json()
        setAlert({
          show: true,
          message: errorData.error || 'Failed to send message',
          color: 'danger'
        })
      }
    } catch (error) {
      setAlert({
        show: true,
        message: 'Network error. Please check if the backend is running.',
        color: 'danger'
      })
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString()
    } catch {
      return dateString
    }
  }

  return (
    <CRow>
      <CCol xs={12} md={8}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Send a Message</strong>
          </CCardHeader>
          <CCardBody>
            {alert.show && (
              <CAlert color={alert.color} dismissible onClose={() => setAlert({ ...alert, show: false })}>
                {alert.message}
              </CAlert>
            )}
            
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol md={12}>
                <CFormTextarea
                  id="messageContent"
                  label="Your Message"
                  placeholder="Enter your message here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  required
                  feedbackInvalid="Please provide a message."
                />
              </CCol>
              <CCol xs={12}>
                <CButton 
                  color="primary" 
                  type="submit" 
                  disabled={loading || !content.trim()}
                >
                  {loading ? (
                    <>
                      <CSpinner size="sm" className="me-2" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      
      <CCol xs={12} md={4}>
        <CCard>
          <CCardHeader>
            <strong>Recent Messages</strong>
            <CBadge color="info" className="ms-2">{messages.length}</CBadge>
          </CCardHeader>
          <CCardBody>
            {messages.length === 0 ? (
              <p className="text-muted">No messages yet. Send the first one!</p>
            ) : (
              <CListGroup flush>
                {messages.slice(0, 10).map((message) => (
                  <CListGroupItem key={message.id} className="px-0">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <p className="mb-1">{message.content}</p>
                        <small className="text-muted">{formatDate(message.createdAt)}</small>
                      </div>
                    </div>
                  </CListGroupItem>
                ))}
              </CListGroup>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default MessageForm
