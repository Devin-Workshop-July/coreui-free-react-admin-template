import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CBadge,
  CAvatar,
  CForm,
  CFormTextarea,
  CAlert,
  CListGroup,
  CListGroupItem,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilArrowLeft,
  cilSend,
  cilThumbUp,
  cilThumbDown,
  cilOptions,
  cilCheckCircle,
  cilClock,
} from '@coreui/icons'

const QuestionDetail = () => {
  const { id } = useParams()
  const [question, setQuestion] = useState(null)
  const [responses, setResponses] = useState([])
  const [newResponse, setNewResponse] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    const mockQuestion = {
      id: parseInt(id),
      title: 'How to implement OAuth authentication in React?',
      description: `I'm working on a React application and need to implement OAuth authentication with Google and GitHub. 

I've looked at several libraries like react-oauth/google and @octokit/auth-oauth-app, but I'm not sure about the best practices for:

1. Storing tokens securely
2. Handling token refresh
3. Managing user sessions
4. Protecting routes

Has anyone implemented this recently? What approach would you recommend?

Current setup:
- React 18
- React Router v6
- Context API for state management

Any code examples or documentation links would be greatly appreciated!`,
      author: 'John Smith',
      authorAvatar: '/src/assets/images/avatars/1.jpg',
      status: 'in-review',
      priority: 'medium',
      category: 'technical',
      tags: ['react', 'oauth', 'authentication', 'security'],
      reviewerGroup: 'Technical Team',
      createdAt: '2 hours ago',
      updatedAt: '1 hour ago',
    }

    const mockResponses = [
      {
        id: 1,
        author: 'Sarah Wilson',
        authorAvatar: '/src/assets/images/avatars/2.jpg',
        role: 'Senior Developer',
        content: `Great question! I recently implemented OAuth in our React app. Here's what I'd recommend:

**For token storage:**
- Use httpOnly cookies for refresh tokens (most secure)
- Store access tokens in memory (React state/context)
- Avoid localStorage for sensitive tokens

**Libraries I'd suggest:**
- \`@auth0/auth0-react\` - comprehensive solution
- \`react-oauth/google\` - specifically for Google OAuth

**Route protection pattern:**
\`\`\`jsx
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <Spinner />;
  return isAuthenticated ? children : <Navigate to="/login" />;
};
\`\`\`

Would you like me to share a more detailed implementation example?`,
        createdAt: '1 hour ago',
        helpful: 5,
        isReviewer: true,
      },
      {
        id: 2,
        author: 'Mike Chen',
        authorAvatar: '/src/assets/images/avatars/3.jpg',
        role: 'Tech Lead',
        content: `Adding to Sarah's excellent response - here are some additional security considerations:

**Token Refresh Strategy:**
- Implement automatic token refresh before expiration
- Handle refresh failures gracefully
- Use interceptors for API calls

**Session Management:**
- Set appropriate token expiration times
- Implement proper logout (clear all tokens)
- Handle concurrent tab scenarios

I can share our internal OAuth implementation guide if that would help. It includes examples for both Google and GitHub integration.`,
        createdAt: '45 minutes ago',
        helpful: 3,
        isReviewer: true,
      },
    ]

    setQuestion(mockQuestion)
    setResponses(mockResponses)
  }, [id])

  const handleSubmitResponse = async (e) => {
    e.preventDefault()
    if (!newResponse.trim()) return

    setIsSubmitting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newResponseObj = {
        id: responses.length + 1,
        author: 'Current User',
        authorAvatar: '/src/assets/images/avatars/8.jpg',
        role: 'Developer',
        content: newResponse,
        createdAt: 'Just now',
        helpful: 0,
        isReviewer: false,
      }
      
      setResponses(prev => [...prev, newResponseObj])
      setNewResponse('')
      setShowSuccess(true)
      
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.error('Error submitting response:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'warning', text: 'Pending Review', icon: cilClock },
      'in-review': { color: 'info', text: 'In Review', icon: cilClock },
      answered: { color: 'success', text: 'Answered', icon: cilCheckCircle },
    }
    return statusConfig[status] || { color: 'secondary', text: 'Unknown', icon: cilClock }
  }

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      low: { color: 'success', text: 'Low' },
      medium: { color: 'warning', text: 'Medium' },
      high: { color: 'danger', text: 'High' },
      urgent: { color: 'dark', text: 'Urgent' },
    }
    return priorityConfig[priority] || { color: 'secondary', text: 'Unknown' }
  }

  if (!question) {
    return <div>Loading...</div>
  }

  const statusBadge = getStatusBadge(question.status)
  const priorityBadge = getPriorityBadge(question.priority)

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
          <h2 className="mb-0">Question Details</h2>
        </div>
      </CCol>

      <CCol xs={12}>
        {showSuccess && (
          <CAlert color="success" dismissible onClose={() => setShowSuccess(false)}>
            <strong>Response submitted!</strong> Your response has been added to the discussion.
          </CAlert>
        )}

        <CCard className="mb-4">
          <CCardHeader>
            <div className="d-flex justify-content-between align-items-start">
              <div className="flex-grow-1">
                <h4 className="mb-2">{question.title}</h4>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <CBadge color={statusBadge.color}>
                    <CIcon icon={statusBadge.icon} className="me-1" size="sm" />
                    {statusBadge.text}
                  </CBadge>
                  <CBadge color={priorityBadge.color}>{priorityBadge.text}</CBadge>
                  <CBadge color="secondary">{question.category}</CBadge>
                </div>
                <div className="d-flex align-items-center gap-3 text-body-secondary">
                  <div className="d-flex align-items-center">
                    <CAvatar
                      src={question.authorAvatar}
                      size="sm"
                      className="me-2"
                    />
                    <span>Asked by <strong>{question.author}</strong></span>
                  </div>
                  <span>•</span>
                  <span>{question.createdAt}</span>
                  <span>•</span>
                  <span>Assigned to: <strong>{question.reviewerGroup}</strong></span>
                </div>
              </div>
              <CDropdown>
                <CDropdownToggle color="ghost" size="sm">
                  <CIcon icon={cilOptions} />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem>Edit Question</CDropdownItem>
                  <CDropdownItem>Change Priority</CDropdownItem>
                  <CDropdownItem>Reassign Reviewers</CDropdownItem>
                  <CDropdownItem divider />
                  <CDropdownItem className="text-danger">Delete Question</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </div>
          </CCardHeader>
          <CCardBody>
            <div className="mb-3" style={{ whiteSpace: 'pre-wrap' }}>
              {question.description}
            </div>
            {question.tags && question.tags.length > 0 && (
              <div className="d-flex gap-1 flex-wrap">
                {question.tags.map((tag, index) => (
                  <CBadge key={index} color="light" className="text-body">
                    #{tag}
                  </CBadge>
                ))}
              </div>
            )}
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader>
            <strong>Responses ({responses.length})</strong>
          </CCardHeader>
          <CCardBody className="p-0">
            {responses.length > 0 ? (
              <CListGroup flush>
                {responses.map((response) => (
                  <CListGroupItem key={response.id} className="p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="d-flex align-items-center">
                        <CAvatar
                          src={response.authorAvatar}
                          size="sm"
                          className="me-3"
                        />
                        <div>
                          <div className="d-flex align-items-center gap-2">
                            <strong>{response.author}</strong>
                            {response.isReviewer && (
                              <CBadge color="primary" size="sm">Reviewer</CBadge>
                            )}
                          </div>
                          <small className="text-body-secondary">
                            {response.role} • {response.createdAt}
                          </small>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <CButton color="ghost" size="sm">
                          <CIcon icon={cilThumbUp} className="me-1" />
                          {response.helpful}
                        </CButton>
                        <CButton color="ghost" size="sm">
                          <CIcon icon={cilThumbDown} />
                        </CButton>
                      </div>
                    </div>
                    <div style={{ whiteSpace: 'pre-wrap' }}>
                      {response.content}
                    </div>
                  </CListGroupItem>
                ))}
              </CListGroup>
            ) : (
              <div className="p-4 text-center text-body-secondary">
                No responses yet. Be the first to help answer this question!
              </div>
            )}
          </CCardBody>
        </CCard>

        <CCard>
          <CCardHeader>
            <strong>Add Your Response</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmitResponse}>
              <CFormTextarea
                rows={4}
                value={newResponse}
                onChange={(e) => setNewResponse(e.target.value)}
                placeholder="Share your knowledge and help answer this question..."
                className="mb-3"
              />
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-body-secondary">
                  Be helpful and constructive in your response
                </small>
                <CButton
                  color="primary"
                  type="submit"
                  disabled={isSubmitting || !newResponse.trim()}
                >
                  <CIcon icon={cilSend} className="me-2" />
                  {isSubmitting ? 'Submitting...' : 'Submit Response'}
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default QuestionDetail
