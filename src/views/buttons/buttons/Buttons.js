import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { Button } from '@mui/material'
import CIcon from '@coreui/icons-react'
import { cilBell } from '@coreui/icons'
import { DocsComponents, DocsExample } from 'src/components'

const Buttons = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <DocsComponents href="components/buttons/" />
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              CoreUI includes a bunch of predefined buttons components, each serving its own
              semantic purpose. Buttons show what action will happen when the user clicks or touches
              it. CoreUI buttons are used to initialize operations, both in the background or
              foreground of an experience.
            </p>
            <DocsExample href="components/buttons">
              {['normal', 'active', 'disabled'].map((state, index) => (
                <CRow className="align-items-center mb-3" key={index}>
                  <CCol xs={12} xl={2} className="mb-3 mb-xl-0">
                    {state.charAt(0).toUpperCase() + state.slice(1)}
                  </CCol>
                  <CCol xs>
                    {['primary', 'secondary', 'success', 'error', 'warning', 'info'].map(
                      (color, index) => (
                        <Button
                          color={color}
                          key={index}
                          variant={state === 'active' ? 'contained' : 'contained'}
                          disabled={state === 'disabled'}
                          sx={{ mr: 1, mb: 1 }}
                        >
                          {color.charAt(0).toUpperCase() + color.slice(1)}
                        </Button>
                      ),
                    )}
                    <Button variant="text" sx={{ mr: 1, mb: 1 }}>
                      Link
                    </Button>
                  </CCol>
                </CRow>
              ))}
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button</strong> <small>with icons</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              You can combine button with our <a href="https://coreui.io/icons/">CoreUI Icons</a>.
            </p>
            <DocsExample href="components/buttons">
              {['normal', 'active', 'disabled'].map((state, index) => (
                <CRow className="align-items-center mb-3" key={index}>
                  <CCol xs={12} xl={2} className="mb-3 mb-xl-0">
                    {state.charAt(0).toUpperCase() + state.slice(1)}
                  </CCol>
                  <CCol xs>
                    {['primary', 'secondary', 'success', 'error', 'warning', 'info'].map(
                      (color, index) => (
                        <Button
                          color={color}
                          key={index}
                          variant={state === 'active' ? 'contained' : 'contained'}
                          disabled={state === 'disabled'}
                          sx={{ mr: 1, mb: 1 }}
                          startIcon={<CIcon icon={cilBell} />}
                        >
                          {color.charAt(0).toUpperCase() + color.slice(1)}
                        </Button>
                      ),
                    )}
                    <Button
                      variant="text"
                      sx={{ mr: 1, mb: 1 }}
                      startIcon={<CIcon icon={cilBell} />}
                    >
                      Link
                    </Button>
                  </CCol>
                </CRow>
              ))}
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button</strong> <small>Button components</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              The <code>&lt;CButton&gt;</code> component are designed for{' '}
              <code>&lt;button&gt;</code> , <code>&lt;a&gt;</code> or <code>&lt;input&gt;</code>{' '}
              elements (though some browsers may apply a slightly different rendering).
            </p>
            <p className="text-body-secondary small">
              If you&#39;re using <code>&lt;CButton&gt;</code> component as <code>&lt;a&gt;</code>{' '}
              elements that are used to trigger functionality ex. collapsing content, these links
              should be given a <code>role=&#34;button&#34;</code> to adequately communicate their
              meaning to assistive technologies such as screen readers.
            </p>
            <DocsExample href="components/buttons#button-components">
              <Button component="a" color="primary" href="#" role="button" sx={{ mr: 1, mb: 1 }}>
                Link
              </Button>
              <Button type="submit" color="primary" sx={{ mr: 1, mb: 1 }}>
                Button
              </Button>
              <input
                type="button"
                value="Input"
                style={{
                  marginRight: '8px',
                  marginBottom: '8px',
                  padding: '6px 16px',
                  backgroundColor: '#1976d2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              />
              <input
                type="submit"
                value="Submit"
                style={{
                  marginRight: '8px',
                  marginBottom: '8px',
                  padding: '6px 16px',
                  backgroundColor: '#1976d2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              />
              <input
                type="reset"
                value="Reset"
                style={{
                  marginRight: '8px',
                  marginBottom: '8px',
                  padding: '6px 16px',
                  backgroundColor: '#1976d2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              />
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button</strong> <small>outline</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              If you need a button, but without the strong background colors. Set{' '}
              <code>variant=&#34;outline&#34;</code> prop to remove all background colors.
            </p>
            <DocsExample href="components/buttons#outline-buttons">
              {['normal', 'active', 'disabled'].map((state, index) => (
                <CRow className="align-items-center mb-3" key={index}>
                  <CCol xs={12} xl={2} className="mb-3 mb-xl-0">
                    {state.charAt(0).toUpperCase() + state.slice(1)}
                  </CCol>
                  <CCol xs>
                    {['primary', 'secondary', 'success', 'error', 'warning', 'info'].map(
                      (color, index) => (
                        <Button
                          color={color}
                          variant="outlined"
                          key={index}
                          disabled={state === 'disabled'}
                          sx={{ mr: 1, mb: 1 }}
                        >
                          {color.charAt(0).toUpperCase() + color.slice(1)}
                        </Button>
                      ),
                    )}
                  </CCol>
                </CRow>
              ))}
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button</strong> <small>ghost</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              If you need a ghost variant of button, set <code>variant=&#34;ghost&#34;</code> prop
              to remove all background colors.
            </p>
            <DocsExample href="components/buttons#ghost-buttons">
              {['normal', 'active', 'disabled'].map((state, index) => (
                <CRow className="align-items-center mb-3" key={index}>
                  <CCol xs={12} xl={2} className="mb-3 mb-xl-0">
                    {state.charAt(0).toUpperCase() + state.slice(1)}
                  </CCol>
                  <CCol xs>
                    {['primary', 'secondary', 'success', 'error', 'warning', 'info'].map(
                      (color, index) => (
                        <Button
                          color={color}
                          variant="text"
                          key={index}
                          disabled={state === 'disabled'}
                          sx={{ mr: 1, mb: 1 }}
                        >
                          {color.charAt(0).toUpperCase() + color.slice(1)}
                        </Button>
                      ),
                    )}
                  </CCol>
                </CRow>
              ))}
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button</strong> <small>Sizes</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Larger or smaller buttons? Add <code>size=&#34;lg&#34;</code> or{' '}
              <code>size=&#34;sm&#34;</code> for additional sizes.
            </p>
            <DocsExample href="components/buttons#sizes">
              <Button color="primary" size="large" sx={{ mr: 1, mb: 1 }}>
                Large button
              </Button>
              <Button color="secondary" size="large" sx={{ mr: 1, mb: 1 }}>
                Large button
              </Button>
            </DocsExample>
            <DocsExample href="components/buttons#sizes">
              <Button color="primary" size="small" sx={{ mr: 1, mb: 1 }}>
                Small button
              </Button>
              <Button color="secondary" size="small" sx={{ mr: 1, mb: 1 }}>
                Small button
              </Button>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button</strong> <small>Pill</small>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="components/buttons#pill-buttons">
              {['primary', 'secondary', 'success', 'error', 'warning', 'info'].map(
                (color, index) => (
                  <Button color={color} sx={{ borderRadius: '50px', mr: 1, mb: 1 }} key={index}>
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </Button>
                ),
              )}
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button</strong> <small>Square</small>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="components/buttons#square">
              {['primary', 'secondary', 'success', 'error', 'warning', 'info'].map(
                (color, index) => (
                  <Button color={color} sx={{ borderRadius: 0, mr: 1, mb: 1 }} key={index}>
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </Button>
                ),
              )}
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button</strong> <small>Disabled state</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Add the <code>disabled</code> boolean prop to any <code>&lt;CButton&gt;</code>{' '}
              component to make buttons look inactive. Disabled button has{' '}
              <code>pointer-events: none</code> applied to, disabling hover and active states from
              triggering.
            </p>
            <DocsExample href="components/buttons#disabled-state">
              <Button color="primary" size="large" disabled sx={{ mr: 1, mb: 1 }}>
                Primary button
              </Button>
              <Button color="secondary" size="large" disabled sx={{ mr: 1, mb: 1 }}>
                Button
              </Button>
            </DocsExample>
            <p className="text-body-secondary small">
              Disabled buttons using the <code>&lt;a&gt;</code> component act a little different:
            </p>
            <p className="text-body-secondary small">
              <code>&lt;a&gt;</code>s don&#39;tsupport the <code>disabled</code> attribute, so
              CoreUI has to add <code>.disabled</code> className to make buttons look inactive.
              CoreUI also has to add to the disabled button component{' '}
              <code>aria-disabled=&#34;true&#34;</code> attribute to show the state of the component
              to assistive technologies.
            </p>
            <DocsExample href="components/buttons#disabled-state">
              <Button
                component="a"
                href="#"
                color="primary"
                size="large"
                disabled
                sx={{ mr: 1, mb: 1 }}
              >
                Primary link
              </Button>
              <Button
                component="a"
                href="#"
                color="secondary"
                size="large"
                disabled
                sx={{ mr: 1, mb: 1 }}
              >
                Link
              </Button>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button</strong> <small>Block buttons</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Create buttons that span the full width of a parent—by using utilities.
            </p>
            <DocsExample href="components/buttons#block-buttons">
              <div className="d-grid gap-2">
                <Button color="primary" fullWidth>
                  Button
                </Button>
                <Button color="primary" fullWidth>
                  Button
                </Button>
              </div>
            </DocsExample>
            <p className="text-body-secondary small">
              Here we create a responsive variation, starting with vertically stacked buttons until
              the <code>md</code> breakpoint, where <code>.d-md-block</code> replaces the{' '}
              <code>.d-grid</code> class, thus nullifying the <code>gap-2</code> utility. Resize
              your browser to see them change.
            </p>
            <DocsExample href="components/buttons#block-buttons">
              <div className="d-grid gap-2 d-md-block">
                <Button color="primary" sx={{ mr: 1, mb: 1 }}>
                  Button
                </Button>
                <Button color="primary" sx={{ mr: 1, mb: 1 }}>
                  Button
                </Button>
              </div>
            </DocsExample>
            <p className="text-body-secondary small">
              You can adjust the width of your block buttons with grid column width classes. For
              example, for a half-width &#34;block button&#34;, use <code>.col-6</code>. Center it
              horizontally with <code>.mx-auto</code>, too.
            </p>
            <DocsExample href="components/buttons#block-buttons">
              <div className="d-grid gap-2 col-6 mx-auto">
                <Button color="primary" fullWidth>
                  Button
                </Button>
                <Button color="primary" fullWidth>
                  Button
                </Button>
              </div>
            </DocsExample>
            <p className="text-body-secondary small">
              Additional utilities can be used to adjust the alignment of buttons when horizontal.
              Here we&#39;ve taken our previous responsive example and added some flex utilities and
              a margin utility on the button to right align the buttons when they&#39;re no longer
              stacked.
            </p>
            <DocsExample href="components/buttons#block-buttons">
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Button color="primary" className="me-md-2">
                  Button
                </Button>
                <Button color="primary">Button</Button>
              </div>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Buttons
