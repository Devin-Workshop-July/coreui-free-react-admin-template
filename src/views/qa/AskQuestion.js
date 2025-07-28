import React, { useState } from 'react'
import axios from 'axios'
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
  CFormCheck,
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
    createJiraTicket: false,
    jiraServerUrl: '',
    jiraProjectKey: '',
    jiraIssueType: 'Task',
    jiraApiToken: '',
  })

  const [validated, setValidated] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
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
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
    let jiraTicket = null
    
    try {
      if (formData.createJiraTicket) {
        try {
          jiraTicket = await createJiraTicket(formData)
        } catch (jiraError) {
          setShowError(true)
          setErrorMessage('Question submitted successfully, but JIRA ticket creation failed. Please create the ticket manually.')
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setShowSuccess(true)
      setSuccessMessage(
        jiraTicket 
          ? `Question submitted successfully! JIRA ticket ${jiraTicket.key} has been created.`
          : 'Question submitted successfully!'
      )
      
      setFormData({
        title: '',
        description: '',
        category: '',
        priority: 'medium',
        tags: '',
        reviewerGroup: '',
        createJiraTicket: false,
        jiraServerUrl: '',
        jiraProjectKey: '',
        jiraIssueType: 'Task',
        jiraApiToken: '',
      })
      setValidated(false)
      
      setTimeout(() => {
        window.location.href = '#/qa/dashboard'
      }, 3000)
    } catch (error) {
      console.error('Error submitting question:', error)
      setShowError(true)
      setErrorMessage('Failed to submit question. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const createJiraTicket = async (questionData) => {
    try {
      const jiraPayload = {
        fields: {
          project: {
            key: questionData.jiraProjectKey
          },
          summary: questionData.title,
          description: {
            type: "doc",
            version: 1,
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: `Category: ${questionData.category}\nPriority: ${questionData.priority}\nReviewer Group: ${questionData.reviewerGroup}\nTags: ${questionData.tags}\n\nDescription:\n${questionData.description}`
                  }
                ]
              }
            ]
          },
          issuetype: {
            name: questionData.jiraIssueType
          },
          priority: {
            name: questionData.priority === 'urgent' ? 'Highest' : 
                  questionData.priority === 'high' ? 'High' :
                  questionData.priority === 'medium' ? 'Medium' : 'Low'
          }
        }
      }

      const response = await axios.post(
        `${questionData.jiraServerUrl}/rest/api/3/issue`,
        jiraPayload,
        {
          headers: {
            'Authorization': `Basic ${btoa(`${questionData.jiraApiToken}:${questionData.jiraApiToken}`)}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      )

      return response.data
    } catch (error) {
      console.error('JIRA ticket creation failed:', error)
      throw error
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
        {showError && (
          <CAlert color="danger" dismissible onClose={() => setShowError(false)}>
            <strong>Error!</strong> {errorMessage}
          </CAlert>
        )}
        
        {showSuccess && (
          <CAlert color="success" dismissible onClose={() => setShowSuccess(false)}>
            <strong>Success!</strong> {successMessage} Redirecting to dashboard...
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
                <CCard className="mt-4">
                  <CCardHeader>
                    <strong>JIRA Integration</strong>
                    <small className="text-body-secondary ms-2">
                      Automatically create JIRA tickets for your questions
                    </small>
                  </CCardHeader>
                  <CCardBody>
                    <CCol xs={12} className="mb-3">
                      <CFormCheck
                        id="createJiraTicket"
                        name="createJiraTicket"
                        checked={formData.createJiraTicket}
                        onChange={handleInputChange}
                        label="Create JIRA ticket when submitting question"
                      />
                    </CCol>
                    
                    {formData.createJiraTicket && (
                      <>
                        <CRow className="g-3">
                          <CCol md={6}>
                            <CFormLabel htmlFor="jiraServerUrl">JIRA Server URL *</CFormLabel>
                            <CFormInput
                              type="url"
                              id="jiraServerUrl"
                              name="jiraServerUrl"
                              value={formData.jiraServerUrl}
                              onChange={handleInputChange}
                              placeholder="https://your-domain.atlassian.net"
                              required={formData.createJiraTicket}
                            />
                            <CFormFeedback invalid>
                              Please provide a valid JIRA server URL.
                            </CFormFeedback>
                          </CCol>
                          <CCol md={6}>
                            <CFormLabel htmlFor="jiraProjectKey">Project Key *</CFormLabel>
                            <CFormInput
                              type="text"
                              id="jiraProjectKey"
                              name="jiraProjectKey"
                              value={formData.jiraProjectKey}
                              onChange={handleInputChange}
                              placeholder="PROJ"
                              required={formData.createJiraTicket}
                            />
                            <CFormFeedback invalid>
                              Please provide a JIRA project key.
                            </CFormFeedback>
                          </CCol>
                          <CCol md={6}>
                            <CFormLabel htmlFor="jiraIssueType">Issue Type</CFormLabel>
                            <CFormSelect
                              id="jiraIssueType"
                              name="jiraIssueType"
                              value={formData.jiraIssueType}
                              onChange={handleInputChange}
                            >
                              <option value="Task">Task</option>
                              <option value="Story">Story</option>
                              <option value="Bug">Bug</option>
                              <option value="Epic">Epic</option>
                            </CFormSelect>
                          </CCol>
                          <CCol md={6}>
                            <CFormLabel htmlFor="jiraApiToken">API Token *</CFormLabel>
                            <CFormInput
                              type="password"
                              id="jiraApiToken"
                              name="jiraApiToken"
                              value={formData.jiraApiToken}
                              onChange={handleInputChange}
                              placeholder="Your JIRA API token"
                              required={formData.createJiraTicket}
                            />
                            <CFormFeedback invalid>
                              Please provide a JIRA API token.
                            </CFormFeedback>
                          </CCol>
                        </CRow>
                      </>
                    )}
                  </CCardBody>
                </CCard>
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
