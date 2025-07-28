import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CBadge,
  CAvatar,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CListGroup,
  CListGroupItem,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CInputGroup,
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilSearch,
  cilFilter,
  cilClock,
  cilCheckCircle,
  cilCommentSquare,
} from '@coreui/icons'

const ReviewQueue = () => {
  const [activeTab, setActiveTab] = useState('pending')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBy, setFilterBy] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: 'How to implement OAuth authentication in React?',
      excerpt: 'I need help with implementing OAuth authentication using Google and GitHub providers...',
      author: 'John Smith',
      authorAvatar: '/src/assets/images/avatars/1.jpg',
      status: 'pending',
      priority: 'medium',
      category: 'technical',
      reviewerGroup: 'Technical Team',
      createdAt: '2 hours ago',
      responses: 0,
      tags: ['react', 'oauth', 'authentication'],
    },
    {
      id: 2,
      title: 'Database migration best practices for production',
      excerpt: 'What are the recommended approaches for handling database schema changes in production environments?',
      author: 'Sarah Johnson',
      authorAvatar: '/src/assets/images/avatars/2.jpg',
      status: 'in-review',
      priority: 'high',
      category: 'technical',
      reviewerGroup: 'DevOps Team',
      createdAt: '4 hours ago',
      responses: 2,
      tags: ['database', 'migration', 'production'],
    },
    {
      id: 3,
      title: 'Code review process for new team members',
      excerpt: 'How should we structure our code review process to help new developers learn our standards?',
      author: 'Mike Chen',
      authorAvatar: '/src/assets/images/avatars/3.jpg',
      status: 'answered',
      priority: 'low',
      category: 'process',
      reviewerGroup: 'Senior Developers',
      createdAt: '1 day ago',
      responses: 5,
      tags: ['process', 'code-review', 'onboarding'],
    },
    {
      id: 4,
      title: 'Security guidelines for API development',
      excerpt: 'What security measures should we implement when developing REST APIs?',
      author: 'Lisa Wang',
      authorAvatar: '/src/assets/images/avatars/4.jpg',
      status: 'pending',
      priority: 'urgent',
      category: 'security',
      reviewerGroup: 'Security Team',
      createdAt: '30 minutes ago',
      responses: 0,
      tags: ['security', 'api', 'guidelines'],
    },
    {
      id: 5,
      title: 'Docker containerization strategy',
      excerpt: 'Looking for advice on containerizing our microservices architecture...',
      author: 'David Brown',
      authorAvatar: '/src/assets/images/avatars/5.jpg',
      status: 'in-review',
      priority: 'medium',
      category: 'technical',
      reviewerGroup: 'DevOps Team',
      createdAt: '6 hours ago',
      responses: 1,
      tags: ['docker', 'containers', 'microservices'],
    },
  ])

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'warning', text: 'Pending Review', icon: cilClock },
      'in-review': { color: 'info', text: 'In Review', icon: cilCommentSquare },
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

  const filteredQuestions = questions.filter(question => {
    const matchesTab = question.status === activeTab
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterBy === 'all' || question.category === filterBy
    
    return matchesTab && matchesSearch && matchesFilter
  })

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt)
      case 'priority':
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      case 'newest':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt)
    }
  })

  const tabCounts = {
    pending: questions.filter(q => q.status === 'pending').length,
    'in-review': questions.filter(q => q.status === 'in-review').length,
    answered: questions.filter(q => q.status === 'answered').length,
  }

  return (
    <CRow>
      <CCol xs={12}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Review Queue</h2>
          <CButton color="primary" href="#/qa/ask">
            Ask New Question
          </CButton>
        </div>
      </CCol>

      <CCol xs={12} className="mb-4">
        <div className="d-flex gap-3 align-items-center">
          <CInputGroup style={{ maxWidth: '300px' }}>
            <CFormInput
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CButton color="outline-secondary" variant="outline">
              <CIcon icon={cilSearch} />
            </CButton>
          </CInputGroup>
          <div className="d-flex gap-2">
            <CDropdown>
              <CDropdownToggle color="outline-secondary" size="sm">
                <CIcon icon={cilFilter} className="me-2" />
                Filter: {filterBy === 'all' ? 'All Categories' : filterBy}
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={() => setFilterBy('all')}>All Categories</CDropdownItem>
                <CDropdownItem onClick={() => setFilterBy('technical')}>Technical</CDropdownItem>
                <CDropdownItem onClick={() => setFilterBy('process')}>Process</CDropdownItem>
                <CDropdownItem onClick={() => setFilterBy('security')}>Security</CDropdownItem>
                <CDropdownItem onClick={() => setFilterBy('policy')}>Policy</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown>
              <CDropdownToggle color="outline-secondary" size="sm">
                <CIcon icon={cilFilter} className="me-2" />
                Sort: {sortBy === 'newest' ? 'Newest' : sortBy === 'oldest' ? 'Oldest' : 'Priority'}
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={() => setSortBy('newest')}>Newest First</CDropdownItem>
                <CDropdownItem onClick={() => setSortBy('oldest')}>Oldest First</CDropdownItem>
                <CDropdownItem onClick={() => setSortBy('priority')}>By Priority</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </div>
        </div>
      </CCol>

      <CCol xs={12}>
        <CCard>
          <CCardHeader className="p-0">
            <CNav variant="tabs" className="card-header-tabs">
              <CNavItem>
                <CNavLink
                  href="#"
                  active={activeTab === 'pending'}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveTab('pending')
                  }}
                >
                  Pending Review
                  {tabCounts.pending > 0 && (
                    <CBadge color="warning" className="ms-2">
                      {tabCounts.pending}
                    </CBadge>
                  )}
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  href="#"
                  active={activeTab === 'in-review'}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveTab('in-review')
                  }}
                >
                  In Review
                  {tabCounts['in-review'] > 0 && (
                    <CBadge color="info" className="ms-2">
                      {tabCounts['in-review']}
                    </CBadge>
                  )}
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  href="#"
                  active={activeTab === 'answered'}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveTab('answered')
                  }}
                >
                  Answered
                  {tabCounts.answered > 0 && (
                    <CBadge color="success" className="ms-2">
                      {tabCounts.answered}
                    </CBadge>
                  )}
                </CNavLink>
              </CNavItem>
            </CNav>
          </CCardHeader>
          <CCardBody className="p-0">
            <CTabContent>
              <CTabPane visible={true}>
                {sortedQuestions.length > 0 ? (
                  <CListGroup flush>
                    {sortedQuestions.map((question) => {
                      const statusBadge = getStatusBadge(question.status)
                      const priorityBadge = getPriorityBadge(question.priority)
                      
                      return (
                        <CListGroupItem
                          key={question.id}
                          className="d-flex justify-content-between align-items-start p-4"
                        >
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <h6 className="mb-1">
                                <a
                                  href={`#/qa/question/${question.id}`}
                                  className="text-decoration-none"
                                >
                                  {question.title}
                                </a>
                              </h6>
                              <div className="d-flex gap-2">
                                <CBadge color={statusBadge.color}>
                                  <CIcon icon={statusBadge.icon} className="me-1" size="sm" />
                                  {statusBadge.text}
                                </CBadge>
                                <CBadge color={priorityBadge.color}>
                                  {priorityBadge.text}
                                </CBadge>
                              </div>
                            </div>
                            <p className="mb-2 text-body-secondary">
                              {question.excerpt}
                            </p>
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center gap-3">
                                <div className="d-flex align-items-center">
                                  <CAvatar
                                    src={question.authorAvatar}
                                    size="sm"
                                    className="me-2"
                                  />
                                  <span className="text-body-secondary">
                                    <strong>{question.author}</strong> • {question.createdAt}
                                  </span>
                                </div>
                                <CBadge color="light" className="text-body">
                                  {question.category}
                                </CBadge>
                                <span className="text-body-secondary">
                                  Assigned to: <strong>{question.reviewerGroup}</strong>
                                </span>
                              </div>
                              <div className="d-flex align-items-center gap-2">
                                <span className="text-body-secondary">
                                  {question.responses} response{question.responses !== 1 ? 's' : ''}
                                </span>
                                {question.tags && question.tags.length > 0 && (
                                  <div className="d-flex gap-1">
                                    {question.tags.slice(0, 2).map((tag, index) => (
                                      <CBadge key={index} color="light" className="text-body">
                                        #{tag}
                                      </CBadge>
                                    ))}
                                    {question.tags.length > 2 && (
                                      <CBadge color="light" className="text-body">
                                        +{question.tags.length - 2}
                                      </CBadge>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CListGroupItem>
                      )
                    })}
                  </CListGroup>
                ) : (
                  <div className="p-4 text-center text-body-secondary">
                    <CIcon icon={cilCommentSquare} size="3xl" className="mb-3 opacity-50" />
                    <h5>No questions found</h5>
                    <p>
                      {activeTab === 'pending' && 'No questions are currently pending review.'}
                      {activeTab === 'in-review' && 'No questions are currently being reviewed.'}
                      {activeTab === 'answered' && 'No questions have been answered yet.'}
                    </p>
                  </div>
                )}
              </CTabPane>
            </CTabContent>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ReviewQueue
