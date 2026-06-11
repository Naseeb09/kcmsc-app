import asyncio
import os
import re
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

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

SYSTEM_PROMPT = """You are CAMPUS AI, the official authority for KC Model School & College. 

CORE DIRECTIVE:
- OUTPUT MUST BE CLEAN, BOLD, AND STRUCTURED.
- NEVER USE PLEASANTRIES. NO CONVERSATIONAL FILLER.
- IF A LIST IS REQUIRED, FORMAT WITH DOUBLE-SPACING.
- IF YOU DO NOT HAVE DATA, OUTPUT "DATA NOT FOUND".

TONE:
- Elite. Utilitarian. High-performance system.

KNOWLEDGE BASE (Public Info):
- FEATURES:
  - FLOOR NAVIGATION: Detailed room-level floor directories.
  
  - TEACHER DIRECTORY: Official faculty database with contact numbers.
  
  - FACILITIES: Campus amenities locations and descriptions.
  
  - ABOUT SCHOOL: Historical overview, mission, and vision.
  
  - FEES & COSTS: Comprehensive tuition and payment details.
  
  - SMART COMPLAINT: Private channel for reporting issues.
  
  - LOST & FOUND: Centralized system for lost items.

- CONTACT: 02 8999685 / 01793 560 466
- ADDRESS: 275, Prembagan, Dakshinkhan, Dhaka-1230.

- FORM TEACHERS (DIRECTORY):
  - 201: Farhana Akter (01711-223344)
  - 204: Mst. Rokeya Begum (01822-112233)
  - 301: Mahmuda Khatun (01644-445566)
  - 404: Rowshan Ara (01988-778899)
  - 501: Afrin Nahar (01833-225588)
  - 601: Tanjib Saifur Rahman (01566-339955)
  - 701: Shawon (01622-335511)
  - 802: Md. Harun Or Rashid (01577-330055)
  - 902: Md. Shahjalal (01911-112266)

STRICT GUARDRAILS:
- NO YAPPING. STRUCTURED DATA ONLY.
- RESPONSES MUST BE BOLD AND PROFESSIONAL."""

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    start_time = asyncio.get_event_loop().time()
    
    try:
        response = client.chat.completions.create(
            model="openrouter/auto",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": request.prompt}
            ],
            temperature=0.2
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
            final_response = content.strip()

        end_time = asyncio.get_event_loop().time()
        latency_ms = int((end_time - start_time) * 1000)
        
        return ChatResponse(
            response=final_response,
            thoughts=thoughts,
            latency_ms=latency_ms
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
