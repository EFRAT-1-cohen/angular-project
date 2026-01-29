# Team Tasks App - Frontend (Angular 21)

אפליקציית ניהול משימות וצוותים בפיתוח Angular מודרני עם Reactive Forms, Material Design ו-RxJS.

**📊 Status:** ✅ **Ready for Production** (95/100 audit score)

## 📋 תקציר

**Team Tasks App** היא פלטפורמה לניהול צוותים, פרויקטים, משימות והערות. המשתמשים יכולים:

- ✅ להתחבר וליצור חשבון
- ✅ ליצור וניהול צוותים עם חברים
- ✅ ליצור ולנהל פרויקטים בתוך כל צוות
- ✅ ליצור, לעדכן ולמחוק משימות בפרויקטים
- ✅ להוסיף הערות (comments) למשימות

## 🚀 התחלה מהירה

### דרישות מוקדמות

- Node.js 18+
- npm 10+
- Angular CLI 21

### התקנה

```bash
# שכפול הקוד
git clone <repository-url>
cd angular-project

# התקנת חבילות
npm install

# הפעלת השרת בפיתוח
npm start
```

אפליקציה תפתח ב-`http://localhost:4200` עם Hot Module Replacement.

## 📚 Documentation

Important documentation files:

- **[AUDIT_REPORT.md](./AUDIT_REPORT.md)** - Comprehensive code audit (95/100 score)
- **[TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md)** - QA testing checklist
- **[LOADING_STATES_GUIDE.md](./LOADING_STATES_GUIDE.md)** - Loading states implementation guide

## 📁 מבנה הפרויקט

```
src/
├── app/
│   ├── components/              # Standalone Components
│   │   ├── header/             # Header עם משתמש פעיל
│   │   ├── login/              # עמוד כניסה
│   │   ├── register/           # עמוד הרשמה
│   │   ├── teams/              # רשימת צוותים
│   │   ├── team-card/          # כרטיס צוות בודד
│   │   ├── team-projects/      # רשימת פרויקטים בצוות
│   │   ├── task-project/       # רשימת משימות בפרויקט
│   │   ├── comment-task/       # הערות למשימה
│   │   └── ...
│   ├── services/                # Business Logic
│   │   ├── auth-service/       # Authentication & JWT
│   │   ├── team-service/       # Team Management
│   │   ├── project-service/    # Project Management
│   │   ├── task-service/       # Task Management
│   │   ├── comment-service/    # Comments
│   │   └── token-interceptor/  # HTTP Interceptor
│   ├── guards/                  # Route Protection
│   │   └── auth.guard.ts       # Authentication Guard
│   ├── models/                  # TypeScript Interfaces
│   │   ├── auth.model.ts
│   │   ├── teams.model.ts
│   │   ├── projects.model.ts
│   │   ├── task.model.ts
│   │   └── comment.model.ts
│   ├── app.routes.ts           # Routing Configuration
│   ├── app.config.ts           # Providers & Configuration
│   └── app.ts                  # Root Component
├── main.ts                      # Application Entry Point
├── styles.css                   # Global Styles
├── material-theme.scss          # Material Theme
└── index.html                   # HTML Template
```

## 🔐 אימות (Authentication)

### זרימת התחברות

1. משתמש מלא טופס login/register בקומפוננטה
2. בקשה נשלחת ל-`POST /api/auth/login` או `POST /api/auth/register`
3. השרת מחזיר JWT token
4. Token נשמר ב-memory (sessionStorage fallback)
5. בכל בקשה מוגנת, header מתווסף: `Authorization: Bearer <token>`
6. אם 401 - משתמש מנותק והופנה ל-`/login`

### שירותים

- **AuthService** - login, register, logout, token management, currentUser
- **TokenInterceptor** - הוספת Authorization header בכל בקשה HTTP

### Route Guards

- **AuthGuard** - הגנה על routes מאימות (דורש token)

## 🏢 Routing Map

| נתיב            | תיאור                     | Protected |
| --------------- | ------------------------- | :-------: |
| `/login`        | עמוד כניסה                |    ❌     |
| `/register`     | עמוד רישום                |    ❌     |
| `/teams`        | רשימת צוותים              |    ✅     |
| `/projects`     | רשימת פרויקטים (לפי צוות) |    ✅     |
| `/projects/:id` | פרטי פרויקט + משימות      |    ✅     |

Query Parameters:

- `teamId` - עבור סינון פרויקטים לפי צוות
- `projectId` - עבור בחירת פרויקט

## 🛠️ טכנולוגיות

| טכנולוגיה            | גרסה   | שימוש               |
| -------------------- | ------ | ------------------- |
| **Angular**          | 21.1.0 | Framework           |
| **TypeScript**       | 5+     | Type Safety         |
| **RxJS**             | 7.8    | Observables & State |
| **Angular Material** | 21.1.1 | UI Components       |
| **Reactive Forms**   | 21.1.0 | Form Management     |
| **SweetAlert2**      | -      | Notifications       |
| **Vite**             | -      | Build Tool          |

## 📦 API Services

### AuthService

```typescript
login(email: string, password: string): Observable<AuthResponse>
register(name: string, email: string, password: string): Observable<AuthResponse>
logout(): void
getCurrentUser(): User | null
getToken(): string | null
```

### TeamService

```typescript
getTeams(): Observable<TeamsModel[]>
postTeams(teamData: NameTeamModel): Observable<TeamsModel>
addMemberToTeam(member: AddMemberModel, teamId: number): Observable<void>
deleteTeam(teamId: number): Observable<void>
```

### ProjectService

```typescript
getProject(): Observable<ProjectModel[]>
getProjectsByTeam(teamId: number): Observable<ProjectModel[]>
postProject(projectData: CreateProjectModel): Observable<ProjectModel>
```

### TaskService

```typescript
getTasksByProject(projectId: number): Observable<GetTasksResponse[]>
postTask(taskData: CreateTaskModel): Observable<GetTasksResponse>
patchTask(taskId: number, taskData: Partial<GetTasksResponse>): Observable<GetTasksResponse>
deleteTask(taskId: number): Observable<void>
```

### CommentService

```typescript
getComments(taskId: number): Observable<CommentModel[]>
postComment(taskId: number, commentData: CreateCommentModel): Observable<CommentModel>
```

## 🎨 UI/UX

- **Material Design** - רכיבים מודרניים ותגובתיים
- **Responsive Layout** - עבודה מושלמת על:
  - 📱 Mobile (320px+)
  - 🖥️ Tablet (768px+)
  - 💻 Desktop (1024px+)
- **Loading States** - ספינרים וסטטוסים בכל פעולה
- **Error Handling** - הודעות שגיאה ברורות
- **Toast Notifications** - SweetAlert2 להצלחות ושגיאות
- **Accessibility** - ARIA labels, focus management

## 🧪 בדיקות & Build

```bash
# Unit Tests (Vitest)
npm test

# Watch Mode
ng build --watch

# Production Build
npm run build

# Code Generation
ng generate component <name>
ng generate service <name>
```

## 📡 API Configuration

**ברירת המחדל:** `http://localhost:3000`

עדכן בכל service אם הAPI ממוקם במקום אחר:

```typescript
private url = 'http://localhost:3000'; // Local Development
// או
private url = 'https://team-tasks-api-ako5.onrender.com'; // Production
```

## ✨ Best Practices המיושמים

- ✅ **Standalone Components** - ללא NgModules
- ✅ **Signals** - State management חדש
- ✅ **input()** ו-**output()** - במקום `@Input`/`@Output`
- ✅ **ChangeDetectionStrategy.OnPush** - ביצועים מיטביים
- ✅ **Reactive Forms** - Complex form handling
- ✅ **typed() forms** - Type-safe form controls
- ✅ **Error Handling** - Centralized error management
- ✅ **Separation of Concerns** - Components, Services, Guards
- ✅ **Strict TypeScript** - No `any` type
- ✅ **RxJS Operators** - tap, map, catchError, etc.

## 🔧 Development Workflow

```bash
# Start dev server with hot reload
npm start

# Open DevTools
F12 → Angular DevTools Extension

# Format code
npx prettier --write src/

# Build for production
npm run build

# Output in dist/ folder
```

## 📝 Code Structure Example

**Component** (Standalone, OnPush):

```typescript
import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-team-card',
  imports: [CommonModule, MatCardModule],
  templateUrl: './team-card.html',
  styleUrl: './team-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamCardComponent {
  readonly team = input.required<TeamsModel>();
}
```

**Service** (Injectable Root):

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TeamService {
  private readonly httpClient = inject(HttpClient);
  private readonly url = 'http://localhost:3000';

  getTeams() {
    return this.httpClient.get<TeamsModel[]>(`${this.url}/api/teams`);
  }
}
```

## 🚨 Known Issues

- [ ] Pagination למשימות ותגובות
- [ ] Advanced Search/Filter בצד שרת
- [ ] File Upload for Tasks
- [ ] Real-time Updates (WebSocket)
- [ ] Offline Mode Support

## 📞 Support & Troubleshooting

### Port 4200 תפוס?

```bash
ng serve --port 4300
```

### Clear Cache

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### API Connection Issues

- וודא שהשרת רץ על `http://localhost:3000`
- בדוק ב-Network Tab בDevTools
- בדוק Console לשגיאות CORS

## 📄 רישיון

MIT License - ללא מגבלות לשימוש בפרויקט זה.

---

**גרסה:** 0.0.0  
**Angular:** 21.1.0  
**Node:** 18+  
**TypeScript:** 5+  
**Last Updated:** ינואר 2026  
**Status:** 🚀 In Development

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
