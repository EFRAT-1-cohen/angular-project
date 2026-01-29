# ✅ Testing Checklist - Team Tasks App Frontend

**Last Updated:** January 29, 2026  
**Status:** Ready for QA Testing

---

## 🔐 Authentication Flow

- [ ] **Login Page Loads**
  - [ ] Form fields visible (email, password)
  - [ ] Password visibility toggle works
  - [ ] Validation messages appear on invalid input

- [ ] **Login Success**
  - [ ] Valid credentials trigger API call
  - [ ] Loading spinner appears during request
  - [ ] Token saved to sessionStorage
  - [ ] Redirects to `/teams` page
  - [ ] User name appears in header

- [ ] **Login Error**
  - [ ] Invalid credentials show error message
  - [ ] Error banner appears
  - [ ] Close button dismisses error
  - [ ] Loading spinner disappears

- [ ] **Register Page Loads**
  - [ ] Form fields visible (name, email, password, confirm)
  - [ ] Password visibility toggle works
  - [ ] Submit button disabled for invalid form

- [ ] **Register Success**
  - [ ] Valid data triggers API call
  - [ ] Loading spinner appears
  - [ ] Token saved
  - [ ] Redirects to `/teams`

- [ ] **Register Error**
  - [ ] Duplicate email shows error
  - [ ] Error banner dismissible

- [ ] **Logout**
  - [ ] Logout button in header works
  - [ ] Token removed from storage
  - [ ] Redirects to `/login`
  - [ ] User info cleared

---

## 👥 Teams Page

- [ ] **Page Loads**
  - [ ] Teams list fetches and displays
  - [ ] Loading spinner shows during fetch
  - [ ] Teams grid responsive on mobile

- [ ] **Team Cards**
  - [ ] Team name displayed
  - [ ] Members count shown
  - [ ] Gradient styling applied
  - [ ] Clickable to navigate to projects

- [ ] **Create Team**
  - [ ] Form expands when "New Team" clicked
  - [ ] Name input focused and ready
  - [ ] Submit button works
  - [ ] Loading state during creation
  - [ ] Success: New team appears in list
  - [ ] Error: Banner shows error message
  - [ ] Form clears on success

- [ ] **Error Handling**
  - [ ] API error shows banner
  - [ ] Dismiss button works
  - [ ] Loading overlay closes on error

---

## 📂 Projects Page

- [ ] **Page Loads**
  - [ ] Correct team selected
  - [ ] Projects list fetches
  - [ ] Loading spinner visible
  - [ ] Empty state shows if no projects

- [ ] **Project Cards**
  - [ ] Project name and description shown
  - [ ] Cards responsive grid layout
  - [ ] Clickable to open tasks

- [ ] **Create Project**
  - [ ] Form expands correctly
  - [ ] Fields: name, description populated
  - [ ] Submit button disabled for invalid form
  - [ ] Loading state on submit
  - [ ] New project appears after success
  - [ ] Error banner on failure

- [ ] **Navigation**
  - [ ] Back button visible in header
  - [ ] Back button returns to teams
  - [ ] Team selector (if any) works

---

## ✏️ Tasks Page

- [ ] **Page Loads**
  - [ ] Correct project displayed (PROJECT #{id})
  - [ ] Tasks list fetches
  - [ ] Loading spinner shows
  - [ ] Empty state shows if no tasks

- [ ] **Task Cards Display**
  - [ ] Task title visible
  - [ ] Status badge shows: 📋 לביצוע, 🚀 בתהליך, ✅ הושלם
  - [ ] Priority color-coded: 🟢 low, 🔵 normal, 🔴 high
  - [ ] Due date formatted (dd/MM)
  - [ ] Description (or "אין תיאור" if empty)
  - [ ] Assignee avatar shows ID or "?"

- [ ] **Create Task**
  - [ ] "משימה חדשה" button toggles form
  - [ ] Form fields: title, description, status, priority, dueDate, assigneeId
  - [ ] Status dropdown options correct
  - [ ] Priority dropdown options correct
  - [ ] Date picker works
  - [ ] Submit disabled for invalid form
  - [ ] Loading state (button text: "יוצר...")
  - [ ] Success: New task appears in list
  - [ ] Form clears and collapses on success
  - [ ] Error banner on failure

- [ ] **Edit Task**
  - [ ] Edit menu item works per card
  - [ ] Form populates with task data
  - [ ] Save button changes to "שמור שינויים"
  - [ ] Submit disabled for invalid form
  - [ ] Loading state (button text: "מעדכן...")
  - [ ] Success: Task card updates
  - [ ] Error handled properly

- [ ] **Delete Task**
  - [ ] Delete menu item works
  - [ ] Confirmation dialog appears (SweetAlert2)
  - [ ] Loading state during deletion
  - [ ] Task removed from list on success
  - [ ] Error banner on failure

- [ ] **Error Handling**
  - [ ] API errors show banner
  - [ ] Menu items disabled during operations
  - [ ] Form inputs disabled during loading

- [ ] **Comments Button**
  - [ ] Opens comments modal/component
  - [ ] Disabled during other operations
  - [ ] Passes taskId correctly

---

## 💬 Comments Component

- [ ] **Component Opens**
  - [ ] Modal or sidebar opens
  - [ ] Correct task ID received
  - [ ] Loading spinner visible during fetch

- [ ] **Comments Display**
  - [ ] Comments list loads
  - [ ] Message bubbles styled correctly
  - [ ] Current user messages: left-aligned (my-message)
  - [ ] Other user messages: right-aligned (other-message)
  - [ ] Author name shows for others
  - [ ] Timestamp formatted (HH:mm)
  - [ ] Empty state shows if no comments

- [ ] **Scroll Behavior**
  - [ ] Auto-scrolls to bottom on load
  - [ ] Auto-scrolls to bottom on new comment

- [ ] **Add Comment**
  - [ ] Input field focused and ready
  - [ ] Enter key submits comment
  - [ ] Send button works
  - [ ] Send button shows "schedule" icon while loading
  - [ ] Input clears on success
  - [ ] New comment appears immediately
  - [ ] Error banner on failure

- [ ] **Error Handling**
  - [ ] API errors show banner
  - [ ] Input disabled during posting
  - [ ] Loading spinner shows

- [ ] **Close Comments**
  - [ ] Modal/sidebar closes
  - [ ] Returns to tasks page
  - [ ] Task state preserved

---

## 🎨 UI/UX Verification

- [ ] **Responsive Design**
  - [ ] Desktop: Full layout visible
  - [ ] Tablet: Adjusted layout works
  - [ ] Mobile: Single column, readable
  - [ ] All buttons clickable on mobile

- [ ] **Loading States**
  - [ ] Spinners smooth (fade-in animation)
  - [ ] Overlay prevents interaction
  - [ ] "טוען..." text visible
  - [ ] Button text changes during operations

- [ ] **Error States**
  - [ ] Error banner visible with icon
  - [ ] Red color (#d32f2f) applied
  - [ ] Close button dismisses banner
  - [ ] Slide-down animation smooth

- [ ] **Colors & Styling**
  - [ ] Material Design theme consistent
  - [ ] Primary gradient (indigo/purple) applied
  - [ ] Priority colors visible
  - [ ] Status badges styled correctly
  - [ ] Text contrast meets WCAG AA

- [ ] **Forms**
  - [ ] Input fields clearly labeled
  - [ ] Validation feedback shown
  - [ ] Buttons enabled/disabled correctly
  - [ ] Form layout readable on mobile

- [ ] **Navigation**
  - [ ] Header visible on all pages
  - [ ] User name and logout button visible
  - [ ] Back button shows when appropriate
  - [ ] Routing works correctly

---

## 🔒 Security Testing

- [ ] **Token Management**
  - [ ] Token stored in sessionStorage
  - [ ] Token sent in Authorization header
  - [ ] Token cleared on logout
  - [ ] No token exposure in console
  - [ ] No sensitive data in localStorage

- [ ] **Route Protection**
  - [ ] Unauth users cannot access protected routes
  - [ ] Redirect to `/login` works
  - [ ] Auth guard blocks access

- [ ] **CORS & Headers**
  - [ ] API requests include Bearer token
  - [ ] Content-Type: application/json set
  - [ ] Requests complete without CORS errors

---

## 🐛 Error Scenarios

- [ ] **Network Errors**
  - [ ] Connection lost shows error
  - [ ] Error banner appears
  - [ ] Retry possible

- [ ] **Server Errors**
  - [ ] 401 Unauthorized: Logout + Redirect
  - [ ] 403 Forbidden: Show permission error
  - [ ] 404 Not Found: Show appropriate message
  - [ ] 500 Server Error: Show generic message

- [ ] **Validation Errors**
  - [ ] Required fields: Error appears
  - [ ] Email format: Validation works
  - [ ] Password mismatch (Register): Error shows

- [ ] **Edge Cases**
  - [ ] Empty form submission: Disabled
  - [ ] Rapid button clicks: No duplicates
  - [ ] Very long text: Properly truncated
  - [ ] Special characters: Handled safely

---

## 📊 Performance

- [ ] **Page Load**
  - [ ] Teams page < 2 seconds
  - [ ] Projects page < 2 seconds
  - [ ] Tasks page < 2 seconds

- [ ] **API Requests**
  - [ ] Network tab shows correct endpoints
  - [ ] Token interceptor applied
  - [ ] Requests complete successfully

- [ ] **UI Responsiveness**
  - [ ] No UI lag during typing
  - [ ] Buttons respond instantly
  - [ ] Animations smooth (60fps)
  - [ ] No memory leaks in console

---

## ♿ Accessibility (A11y)

- [ ] **ARIA Labels**
  - [ ] Buttons have aria-labels
  - [ ] Form fields have labels
  - [ ] Icons have aria-labels
  - [ ] Error messages announced

- [ ] **Keyboard Navigation**
  - [ ] Tab through form fields works
  - [ ] Enter submits forms
  - [ ] Esc closes modals/popups
  - [ ] Focus visible on all interactive elements

- [ ] **Screen Reader**
  - [ ] Page structure announced
  - [ ] Form labels read correctly
  - [ ] Buttons read with purpose
  - [ ] Error messages announced

- [ ] **Color Contrast**
  - [ ] Text vs background: 4.5:1 minimum
  - [ ] Error text readable
  - [ ] Buttons distinguishable

---

## 📱 Browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

---

## 🚀 Deployment Checklist

- [ ] Code committed to main branch
- [ ] README.md updated
- [ ] Environment URLs correct
- [ ] No console errors
- [ ] No console warnings
- [ ] API endpoint configured
- [ ] Build passes without errors
- [ ] All tests passing (if any)

---

## ✅ Sign-Off

| Role | Name | Date | Status |
|------|------|------|--------|
| Developer | [Your Name] | 2026-01-29 | ✅ Ready |
| QA Tester | [QA Name] | __________ | ⏳ Pending |
| Product Owner | [PO Name] | __________ | ⏳ Pending |

---

## 📝 Notes & Issues Found

(To be filled during testing)

```
Issue #1:
- [ ] Severity: [Critical/High/Medium/Low]
- [ ] Description: 
- [ ] Steps to Reproduce:
- [ ] Expected vs Actual:
- [ ] Status: [Open/In Progress/Fixed]

Issue #2:
...
```

---

*Testing performed on: 29 January 2026*  
*Environment: Development (localhost:4200)*
