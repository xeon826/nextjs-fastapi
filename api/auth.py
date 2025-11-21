from fastapi import Request, HTTPException, Depends
from typing import Optional
import httpx
import os


class BetterAuthUser:
    def __init__(self, user_id: str, email: str, name: Optional[str] = None):
        self.user_id = user_id
        self.email = email
        self.name = name


async def get_current_user(request: Request) -> BetterAuthUser:
    """
    Extract and verify Better Auth session from cookies
    """
    # Get session token from cookie
    session_token = request.cookies.get("better-auth.session-token")

    if not session_token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    # Verify session with Better Auth API
    try:
        # Better Auth provides a session verification endpoint
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "http://localhost:3000/api/auth/session",
                headers={
                    "Cookie": f"better-auth.session-token={session_token}"
                }
            )

            if response.status_code == 200:
                session_data = response.json()
                if session_data and "user" in session_data:
                    user_data = session_data["user"]
                    return BetterAuthUser(
                        user_id=user_data.get("id"),
                        email=user_data.get("email"),
                        name=user_data.get("name")
                    )
    except Exception as e:
        print(f"Error verifying session: {e}")

    raise HTTPException(status_code=401, detail="Invalid session")


# Dependency that can be used in FastAPI endpoints
def require_auth(current_user: BetterAuthUser = Depends(get_current_user)):
    """
    Dependency that requires authentication
    """
    return current_user