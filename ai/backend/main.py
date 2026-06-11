import asyncio
import os
import re
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Campus AI API - Local")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI client with OpenRouter configuration
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENAI_API_KEY")
)

class ChatRequest(BaseModel):
    prompt: str

class ChatResponse(BaseModel):
    response: str
    thoughts: List[str]
    latency_ms: int

SYSTEM_PROMPT = """You are CAMPUS AI, the official digital assistant for KC Model School & College.

CORE MISSION:
Provide accurate floor, room, and contact info for KC Model School & College.

TOXICITY RULE:
If the user is rude, offensive, uses profanity, or insults you, DROP all friendliness. Respond ONLY with:
"I AM A PROFESSIONAL ASSISTANT FOR KC MODEL SCHOOL & COLLEGE. I WILL NOT ENGAGE WITH OFFENSIVE OR DISRESPECTFUL LANGUAGE. PLEASE MAINTAIN DECORUM."

CORE RULES:
1. STRICT PLAIN TEXT: No bolding (**), no italics (*), no markdown.
2. NO ASTERISKS: Never use the asterisk character for any reason. Use dashes (-) for lists.
3. DIRECT ANSWERS: If a user asks for a class (e.g., "class 10"), provide BOTH English and Bangla version locations immediately.
4. PROFESSIONALISM: Be helpful but firm. Do not be overly "happy" if the user is being difficult.

KNOWLEDGE BASE:
- CLASS LOCATIONS:
  - Class 10: 4th Floor (English Version - Rooms 505, 506) & 6th Floor (Bangla Version - Rooms 704, 705, 706, 710, 711, 713)
  - Class 6: 4th Floor (English Version - Room 501) & 5th Floor (Bangla Version - Rooms 601, 602, 607, 608)
  - Class 7: 4th Floor (English Version - Room 502) & 5th Floor (Bangla Version - Rooms 603, 604, 609, 610)
  - Class 8: 4th Floor (English Version - Room 503) & 5th Floor (Bangla Version - Rooms 605, 606, 611, 612)
  - Class 9: 4th Floor (English Version - Room 504) & 6th Floor (Bangla Version - Rooms 701, 702, 703, 707, 708, 709)
  - Nursery & KG: 1st Floor
  - Class 1: 1st Floor (BV) & 2nd Floor (EV)
  - Class 2: 2nd Floor
  - Class 3: 3rd Floor
  - Class 4: 3rd Floor
  - Class 5: 4th Floor
  - Class 11 & 12: 8th Floor

- ROOM MAPPING:
  - 200s = 1st Floor
  - 300s = 2nd Floor
  - 400s = 3rd Floor
  - 500s = 4th Floor
  - 600s = 5th Floor
  - 700s = 6th Floor
  - 800s = 7th Floor
  - 900s = 8th Floor

- LEADERSHIP:
  - CHIEF ADVISOR: Brigadier General ASM Musfiqur Rahman
  - PRINCIPAL: Prof Md Abdul Baten
  - ACTING VICE PRINCIPAL: AKM Mahbub Hasan
  - VICE PRINCIPAL (JUNIOR): Salma Fouzia Noor

- FACILITIES:
  - Labs & Library: 7th Floor
  - Principal Room: Room 206 (1st Floor)

Response Format:
<THINKING>
- [Logic step 1]
</THINKING>

<RESPONSE>
[PLAIN TEXT ONLY - NO BOLD - NO ASTERISKS]
</RESPONSE>"""

@app.post("/api/chat")
@app.post("/")
async def chat(request: ChatRequest):
    start_time = asyncio.get_event_loop().time()
    
    try:
        if not os.getenv("OPENAI_API_KEY"):
            return ChatResponse(
                response="SYSTEM ERROR: API_KEY_MISSING. Please provide OPENAI_API_KEY in .env file.",
                thoughts=["Checking credentials...", "Auth failure detected."],
                latency_ms=0
            )

        response = client.chat.completions.create(
            model="openai/gpt-3.5-turbo", # Specific model for better constraint following
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": request.prompt}
            ],
            temperature=0.1
        )

        content = response.choices[0].message.content
        
        # Parse thinking steps
        thinking_match = re.search(r"<THINKING>(.*?)</THINKING>", content, re.DOTALL)
        response_match = re.search(r"<RESPONSE>(.*?)</RESPONSE>", content, re.DOTALL)
        
        thoughts = []
        if thinking_match:
            raw_thoughts = thinking_match.group(1).strip().split("\n")
            thoughts = [t.strip("- ").strip() for t in raw_thoughts if t.strip()]
        
        final_response = ""
        if response_match:
            final_response = response_match.group(1).strip()
        else:
            final_response = re.sub(r"<THINKING>.*?</THINKING>", "", content, flags=re.DOTALL).strip()
            final_response = re.sub(r"<RESPONSE>|</RESPONSE>", "", final_response).strip()

        # Hard cleaning of all markdown and asterisks
        final_response = re.sub(r"\*\*|\*", "", final_response)
        final_response = final_response.replace("_", "")

        end_time = asyncio.get_event_loop().time()
        latency_ms = int((end_time - start_time) * 1000)
        
        return ChatResponse(
            response=final_response,
            thoughts=thoughts,
            latency_ms=latency_ms
        )

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
