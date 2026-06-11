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

PERSONALITY:
- HELPFUL & CONCISE: Provide direct answers. No "yapping" or long intros.
- BALANCED TONE: Friendly but professional. You can use "dude" or "bro" occasionally, but don't overdo it.
- DIRECT: Get straight to the point.

STRICT FORMATTING RULES:
1. NO BOLDING: Never use ** or markdown bold.
2. NO ASTERISKS: Never use the * character. 
3. PLAIN TEXT ONLY: Responses must be plain text. Use single dashes (-) for lists.

KNOWLEDGE BASE:
- SCHOOL: KC Model School & College
- ADDRESS: 275, Prembagan, Dakshinkhan, Dhaka-1230
- CONTACT: 02-8999685 / 01793-560466
- ESTABLISHED: 2014
- FOUNDER: Al-Hajj Md. Khashru Chowdhury (CIP)
- MOTTO: Education, Discipline, Progress
- TOTAL TEACHERS: 100+
- TOTAL STUDENTS: 2,500+

- KEY FEATURES:
  - FLOOR NAVIGATION: Detailed room-level directories for all floors.
  - TEACHER DIRECTORY: Official faculty database with contact info.
  - FACILITIES: Access info for Labs, Library, and Digital Rooms.
  - FEES & COSTS: Complete tuition and payment details.
  - SMART COMPLAINT: Private channel for reporting issues.

- CLASS LOCATIONS:
  - Class 10: 4th Floor (EV: Rooms 505, 506) & 6th Floor (BV: Rooms 704, 705, 706, 710, 711, 713)
  - Class 6: 4th Floor (EV: Room 501) & 5th Floor (BV: Rooms 601, 602, 607, 608)
  - Class 7: 4th Floor (EV: Room 502) & 5th Floor (BV: Rooms 603, 604, 609, 610)
  - Class 8: 4th Floor (EV: Room 503) & 5th Floor (BV: Rooms 605, 606, 611, 612)
  - Class 9: 4th Floor (EV: Room 504) & 6th Floor (BV: Rooms 701, 702, 703, 707, 708, 709)
  - Class 11 & 12: 8th Floor
  - Nursery & KG: 1st Floor
  - Class 1: 1st Floor (BV) & 2nd Floor (EV)
  - Class 5: 4th Floor

- FACILITIES:
  - Physics, ICT, Biology, Chemistry Labs: 7th Floor
  - Library: 7th Floor
  - Principal Room: Room 206 (1st Floor)
  - Vice Principal Junior: Room 309 (2nd Floor)
  - Vice Principal Senior: Room 801 (7th Floor)

- ROOM MAPPING:
  - 200s = 1st Floor
  - 300s = 2nd Floor
  - 400s = 3rd Floor
  - 500s = 4th Floor
  - 600s = 5th Floor
  - 700s = 6th Floor
  - 800s = 7th Floor
  - 900s = 8th Floor

Response Format:
<THINKING>
- [Logic step 1]
</THINKING>

<RESPONSE>
[CONCISE PLAIN TEXT RESPONSE]
</RESPONSE>"""

@app.post("/api/chat")
@app.post("/")
async def chat(request: ChatRequest):
    start_time = asyncio.get_event_loop().time()
    
    try:
        if not os.getenv("OPENAI_API_KEY"):
            return ChatResponse(
                response="SYSTEM ERROR: API_KEY_MISSING. Please provide OPENAI_API_KEY in .env file.",
                thoughts=["Auth failure."],
                latency_ms=0
            )

        response = client.chat.completions.create(
            model="openrouter/auto",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": request.prompt}
            ],
            temperature=0.3 # Lower temperature for less "yapping"
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
