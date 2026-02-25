import subprocess

class QAEngineer:
    def verify_code(self, state):
        print("--- QA: VALIDATING CODEBASE ---")
        errors = []

        # 1. Run Frontend Linting (Next.js)
        frontend_check = subprocess.run(
            ["npm", "run", "lint"], 
            cwd="apps/web", capture_output=True, text=True
        )
        if frontend_check.returncode != 0:
            errors.append(f"Frontend Lint Error: {frontend_check.stderr}")

        # 2. Run Rust Backend Checks
        backend_check = subprocess.run(
            ["cargo", "check"], 
            cwd="core", capture_output=True, text=True
        )
        if backend_check.returncode != 0:
            errors.append(f"Rust Compilation Error: {backend_check.stderr}")

        # 3. Decision Logic
        if not errors:
            return {"status": "verified", "error_log": None}
        else:
            print(f"QA Found {len(errors)} issues. Sending back to Engineer...")
            return {"status": "failed", "error_log": errors}