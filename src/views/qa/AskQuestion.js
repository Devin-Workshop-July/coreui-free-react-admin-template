import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CFormSelect,
  CButton,
  CAlert,
  CFormFeedback,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft, cilSend } from '@coreui/icons'

const AskQuestion = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    tags: '',
    reviewerGroup: '',
  })

  const [validated, setValidated] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    { value: '', label: 'Select a category...' },
    { value: 'technical', label: 'Technical' },
    { value: 'process', label: 'Process & Workflow' },
    { value: 'policy', label: 'Policy & Guidelines' },
    { value: 'tools', label: 'Tools & Software' },
    { value: 'general', label: 'General' },
  ]

  const reviewerGroups = [
    { value: '', label: 'Select reviewer group...' },
    { value: 'tech-team', label: 'Technical Team' },
    { value: 'devops-team', label: 'DevOps Team' },
    { value: 'senior-developers', label: 'Senior Developers' },
    { value: 'product-team', label: 'Product Team' },
    { value: 'qa-team', label: 'QA Team' },
    { value: 'management', label: 'Management' },
  ]

  const priorities = [
    { value: 'low', label: 'Low', color: 'success' },
    { value: 'medium', label: 'Medium', color: 'warning' },
    { value: 'high', label: 'High', color: 'danger' },
    { value: 'urgent', label: 'Urgent', color: 'dark' },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
      return
    }

    setIsSubmitting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setShowSuccess(true)
      setFormData({
        title: '',
        description: '',
        category: '',
        priority: 'medium',
        tags: '',
        reviewerGroup: '',
      })
      setValidated(false)
      
      setTimeout(() => {
        window.location.href = '#/qa/dashboard'
      }, 2000)
    } catch (error) {
      console.error('Error submitting question:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getPriorityBadge = (priority) => {
    const config = priorities.find(p => p.value === priority)
    return config ? { color: config.color, text: config.label } : { color: 'secondary', text: 'Unknown' }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <div className="d-flex align-items-center mb-4">
          <CButton
            color="ghost"
            size="sm"
            href="#/qa/dashboard"
            className="me-3"
          >
            <CIcon icon={cilArrowLeft} />
          </CButton>
          <h2 className="mb-0">Ask a Question</h2>
        </div>
      </CCol>

      <CCol xs={12}>
        {showSuccess && (
          <CAlert color="success" dismissible onClose={() => setShowSuccess(false)}>
            <strong>Success!</strong> Your question has been submitted and assigned to the selected reviewer group. 
            You'll receive notifications when reviewers respond. Redirecting to dashboard...
          </CAlert>
        )}

        <CCard>
          <CCardHeader>
            <strong>Submit Your Question</strong>
            <small className="text-body-secondary ms-2">
              Fill out the form below to get help from your team
            </small>
          </CCardHeader>
          <CCardBody>
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol md={12}>
                <CFormLabel htmlFor="questionTitle">Question Title *</CFormLabel>
                <CFormInput
                  type="text"
                  id="questionTitle"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter a clear, concise title for your question"
                  required
                />
                <CFormFeedback invalid>
                  Please provide a clear title for your question.
                </CFormFeedback>
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="questionCategory">Category *</CFormLabel>
                <CFormSelect
                  id="questionCategory"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </CFormSelect>
                <CFormFeedback invalid>
                  Please select a category for your question.
                </CFormFeedback>
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="reviewerGroup">Reviewer Group *</CFormLabel>
                <CFormSelect
                  id="reviewerGroup"
                  name="reviewerGroup"
                  value={formData.reviewerGroup}
                  onChange={handleInputChange}
                  required
                >
                  {reviewerGroups.map(group => (
                    <option key={group.value} value={group.value}>
                      {group.label}
                    </option>
                  ))}
                </CFormSelect>
                <CFormFeedback invalid>
                  Please select a reviewer group.
                </CFormFeedback>
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="questionPriority">Priority</CFormLabel>
                <CFormSelect
                  id="questionPriority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                >
                  {priorities.map(priority => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </CFormSelect>
                <div className="mt-1">
                  <CBadge color={getPriorityBadge(formData.priority).color}>
                    {getPriorityBadge(formData.priority).text}
                  </CBadge>
                </div>
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="questionTags">Tags</CFormLabel>
                <CFormInput
                  type="text"
                  id="questionTags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="e.g., react, authentication, deployment"
                />
                <small className="text-body-secondary">
                  Separate multiple tags with commas
                </small>
              </CCol>

              <CCol md={12}>
                <CFormLabel htmlFor="questionDescription">Question Details *</CFormLabel>
                <CFormTextarea
                  id="questionDescription"
                  name="description"
                  rows={6}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Provide detailed information about your question. Include context, what you've tried, and what specific help you need."
                  required
                />
                <CFormFeedback invalid>
                  Please provide detailed information about your question.
                </CFormFeedback>
                <small className="text-body-secondary">
                  Be specific and include relevant context to help reviewers provide better answers.
                </small>
              </CCol>

              <CCol xs={12}>
                <div className="d-flex gap-2">
                  <CButton
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <CIcon icon={cilSend} className="me-2" />
                    {isSubmitting ? 'Submitting...' : 'Submit Question'}
                  </CButton>
                  <CButton
                    color="secondary"
                    variant="outline"
                    href="#/qa/dashboard"
                  >
                    Cancel
                  </CButton>
                </div>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12} className="mt-4">
        <CCard>
          <CCardHeader>
            <strong>Tips for Getting Great Answers</strong>
          </CCardHeader>
          <CCardBody>
            <ul className="mb-0">
              <li><strong>Be specific:</strong> Include relevant details and context</li>
              <li><strong>Show your work:</strong> Mention what you've already tried</li>
              <li><strong>Choose the right reviewers:</strong> Select the team most relevant to your question</li>
              <li><strong>Use clear titles:</strong> Make it easy for reviewers to understand your question at a glance</li>
              <li><strong>Add tags:</strong> Help others find and learn from your question</li>
            </ul>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AskQuestion
