# Contributing to Kurt

Thank you for your interest in contributing to Kurt! We're excited to collaborate with you. This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

Be respectful, inclusive, and professional. We're committed to providing a welcoming environment for all contributors.

## How to Contribute

### Reporting Bugs

Before reporting a bug, please:

1. Check existing [GitHub Issues](https://github.com/heisemmanuell/url-shortener/issues) to avoid duplicates
2. Provide a clear, descriptive title
3. Include steps to reproduce the issue
4. Describe the expected vs. actual behavior
5. Include your environment (OS, Node version, etc.)

**Example bug report:**
```
Title: Short links not redirecting properly

Steps to reproduce:
1. Create a short link
2. Click the link
3. Get redirected to wrong URL

Expected: Should redirect to original URL
Actual: Redirects to homepage

Environment:
- OS: macOS 14.2
- Node: 18.17.0
- Browser: Chrome 120
```

### Suggesting Features

1. Check existing [GitHub Issues](https://github.com/heisemmanuell/url-shortener/issues) for similar suggestions
2. Clearly describe the feature and its benefits
3. Provide use cases and examples
4. Explain how it aligns with Kurt's minimalist philosophy

### Submitting Pull Requests

#### Setup Development Environment

1. **Fork the repository**:
   ```bash
   git clone https://github.com/heisemmanuell/url-shortener.git
   cd url-shortener
   ```

2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   # or for bug fixes:
   git checkout -b fix/your-bug-name
   ```

3. **Install dependencies**:
   ```bash
   pnpm install
   ```

4. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Update with your database URL
   ```

5. **Start development server**:
   ```bash
   pnpm run dev
   ```

#### Making Changes

- Write clean, readable code following existing patterns
- Follow the [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
- Keep commits atomic and descriptive
- Reference issues in commit messages: `git commit -m "Fix #123: Description"`

#### Before Submitting

1. **Test your changes**:
   ```bash
   pnpm run lint
   ```

2. **Build the project**:
   ```bash
   pnpm run build
   ```

3. **Update documentation** if needed (README, code comments, etc.)

4. **Create a descriptive commit message**:
   ```
   feat: Add custom shortcode feature
   
   Allow users to specify custom shortcodes when creating links.
   Includes validation and uniqueness checks.
   
   Fixes #456
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** on GitHub with:
   - Clear title and description
   - Reference to related issues
   - Screenshots/demos if applicable
   - Explanation of changes and why they're needed

## Pull Request Guidelines

- **Title**: Use a clear, concise title (e.g., "Add password protection for links")
- **Description**: Explain what the PR does and why
- **Issue reference**: Link to related issues using `Fixes #123` or `Related to #123`
- **Testing**: Describe how you tested the changes
- **Breaking changes**: Clearly mark any breaking changes

### Review Process

1. We'll review your PR within 2-5 days
2. We may request changes or ask questions
3. Once approved, a maintainer will merge your PR
4. Your contribution will be credited

## Project Structure

```
├── app/              # Next.js pages and routes
├── components/       # React components
├── lib/             # Utilities and helpers
├── prisma/          # Database schema and migrations
├── public/          # Static files
└── styles/          # Global styles
```

## Development Guidelines

### Code Style

- Use **TypeScript** for all new code
- Follow **ESLint** configuration
- Format code with Prettier
- Use descriptive variable and function names
- Add comments for complex logic

### Component Structure

```typescript
// Functional components with TypeScript
interface ComponentProps {
  prop1: string;
  prop2?: number;
}

export function MyComponent({ prop1, prop2 }: ComponentProps) {
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}
```

### Database Changes

1. Create a new migration: `npx prisma migrate dev --name your_migration_name`
2. Update the schema in `prisma/schema.prisma`
3. Include migration files in your PR
4. Document schema changes in commit message

### Testing

- Write tests for new features
- Run linter before submitting: `npm run lint`
- Test in both development and production builds

## Areas for Contribution

- **Bug fixes**: Help us squash bugs
- **Performance**: Optimize queries and components
- **Documentation**: Improve README, add examples
- **Features**: New functionality aligned with our vision
- **UI/UX**: Design improvements and polish
- **Tests**: Increase code coverage

## Licensing

By contributing to Kurt, you agree that your contributions will be licensed under the MIT License.

## Questions?

- Open a GitHub Discussion
- Create an issue for help wanted
- Reach out to maintainers directly

## Recognition

Contributors will be recognized in:
- Project README
- GitHub contributors page
- Release notes (for significant contributions)

Thank you for helping make Kurtz better! 🚀
