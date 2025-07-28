import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CBadge,
  CListGroup,
  CListGroupItem,
  CAvatar,
  CProgress,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPlus,
  cilClock,
  cilCheckCircle,
  cilCommentSquare,
  cilPeople,
} from '@coreui/icons'

const QADashboard = () => {
  const [stats, setStats] = useState({
    totalQuestions: 24,
    pendingReview: 8,
    answered: 16,
    myQuestions: 5,
  })

  const [recentQuestions, setRecentQuestions] = useState([
    {
      id: 1,
      title: 'How to implement OAuth authentication in React?',
      author: 'John Smith',
      status: 'pending',
      reviewers: ['Tech Team'],
      createdAt: '2 hours ago',
      responses: 0,
    },
    {
      id: 2,
      title: 'Best practices for database migration in production?',
      author: 'Sarah Johnson',
      status: 'answered',
      reviewers: ['DevOps Team'],
      createdAt: '1 day ago',
      responses: 3,
    },
    {
      id: 3,
      title: 'Code review process for new features',
      author: 'Mike Chen',
      status: 'in-review',
      reviewers: ['Senior Developers'],
      createdAt: '3 hours ago',
      responses: 1,
    },
  ])

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'warning', text: 'Pending Review' },
      'in-review': { color: 'info', text: 'In Review' },
      answered: { color: 'success', text: 'Answered' },
    }
    return statusConfig[status] || { color: 'secondary', text: 'Unknown' }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Q&A Dashboard</h2>
          <CButton color="primary" href="#/qa/ask">
            <CIcon icon={cilPlus} className="me-2" />
            Ask Question
          </CButton>
        </div>
      </CCol>

      <CCol sm={6} lg={3}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-flex justify-content-between">
              <div>
                <div className="fs-4 fw-semibold">{stats.totalQuestions}</div>
                <div className="text-body-secondary text-uppercase fw-semibold small">
                  Total Questions
                </div>
              </div>
              <div className="bg-primary bg-opacity-25 text-primary p-3 rounded">
                <CIcon icon={cilCommentSquare} size="xl" />
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol sm={6} lg={3}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-flex justify-content-between">
              <div>
                <div className="fs-4 fw-semibold">{stats.pendingReview}</div>
                <div className="text-body-secondary text-uppercase fw-semibold small">
                  Pending Review
                </div>
              </div>
              <div className="bg-warning bg-opacity-25 text-warning p-3 rounded">
                <CIcon icon={cilClock} size="xl" />
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol sm={6} lg={3}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-flex justify-content-between">
              <div>
                <div className="fs-4 fw-semibold">{stats.answered}</div>
                <div className="text-body-secondary text-uppercase fw-semibold small">
                  Answered
                </div>
              </div>
              <div className="bg-success bg-opacity-25 text-success p-3 rounded">
                <CIcon icon={cilCheckCircle} size="xl" />
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol sm={6} lg={3}>
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-flex justify-content-between">
              <div>
                <div className="fs-4 fw-semibold">{stats.myQuestions}</div>
                <div className="text-body-secondary text-uppercase fw-semibold small">
                  My Questions
                </div>
              </div>
              <div className="bg-info bg-opacity-25 text-info p-3 rounded">
                <CIcon icon={cilPeople} size="xl" />
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <strong>Recent Questions</strong>
          </CCardHeader>
          <CCardBody className="p-0">
            <CListGroup flush>
              {recentQuestions.map((question) => {
                const statusBadge = getStatusBadge(question.status)
                return (
                  <CListGroupItem
                    key={question.id}
                    className="d-flex justify-content-between align-items-start p-3"
                  >
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="mb-1">
                          <a href={`#/qa/question/${question.id}`} className="text-decoration-none">
                            {question.title}
                          </a>
                        </h6>
                        <CBadge color={statusBadge.color}>{statusBadge.text}</CBadge>
                      </div>
                      <p className="mb-1 text-body-secondary">
                        Asked by <strong>{question.author}</strong> • {question.createdAt}
                      </p>
                      <div className="d-flex align-items-center gap-3">
                        <small className="text-body-secondary">
                          Assigned to: {question.reviewers.join(', ')}
                        </small>
                        <small className="text-body-secondary">
                          {question.responses} response{question.responses !== 1 ? 's' : ''}
                        </small>
                      </div>
                    </div>
                  </CListGroupItem>
                )
              })}
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12} className="mt-4">
        <CCard>
          <CCardHeader>
            <strong>Review Progress</strong>
          </CCardHeader>
          <CCardBody>
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-1">
                <span>Questions Answered This Week</span>
                <span>12/16 (75%)</span>
              </div>
              <CProgress value={75} color="success" />
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-1">
                <span>Average Response Time</span>
                <span>2.5 hours</span>
              </div>
              <CProgress value={85} color="info" />
            </div>
            <div>
              <div className="d-flex justify-content-between mb-1">
                <span>Reviewer Participation</span>
                <span>8/10 (80%)</span>
              </div>
              <CProgress value={80} color="warning" />
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default QADashboard
