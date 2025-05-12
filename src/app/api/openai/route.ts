import { FormData } from "@/lib/types";
import { getLocale } from "next-intl/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

function personalInfoToPrompt(personalInfo: FormData) {
  if (!personalInfo) return "";
  return `
Personal Information:
- Name: ${personalInfo.name || ""}
- National ID: ${personalInfo.nationalId || ""}
- Date of Birth: ${personalInfo.dateOfBirth || ""}
- Gender: ${personalInfo.gender || ""}
- Address: ${personalInfo.address || ""}
- City: ${personalInfo.city || ""}
- State: ${personalInfo.state || ""}
- Country: ${personalInfo.country || ""}
- Phone: ${personalInfo.phone || ""}
- Email: ${personalInfo.email || ""}
- Marital Status: ${personalInfo.maritalStatus || ""}
- Dependents: ${personalInfo.dependents || ""}
- Employment Status: ${personalInfo.employmentStatus || ""}
- Monthly Income: ${personalInfo.monthlyIncome || ""}
- Housing Status: ${personalInfo.housingStatus || ""}
`;
}

export async function POST(request: Request) {
  try {
    const { field, currentValue, personalInfo } = await request.json();
    
    if (!field) {
      return NextResponse.json(
        { error: "Field name is required" },
        { status: 400 }
      );
    }

    const locale = await getLocale();
    const personalInfoPrompt = personalInfoToPrompt(personalInfo);
    
    let prompt = "";
    
    switch (field) {
      case "financialSituation":
        prompt = `You are an AI assistant helping a UAE citizen apply for government financial support. The user needs help describing their financial situation. Based on any information they've provided, suggest a detailed and clear description of their financial circumstances.\n\n${personalInfoPrompt}\nIf they've provided some details, enhance and structure it. If they haven't provided anything, create a generic but realistic financial hardship situation.\n\nCurrent input: "${currentValue || "No information provided"}"\n\nProvide a 150-200 word well-structured response that:\n- Describes current income sources\n- Mentions any recent financial challenges\n- Explains current expenses and debts\n- Indicates any financial assistance already received\n\nKeep the tone respectful and factual.\n\nThe response should be in ${locale} language.`;
        break;
      case "employmentCircumstances":
        prompt = `You are an AI assistant helping a UAE citizen apply for government financial support. The user needs help describing their employment circumstances. Based on any information they've provided, suggest a detailed and clear description of their employment situation.\n\n${personalInfoPrompt}\nIf they've provided some details, enhance and structure it. If they haven't provided anything, create a generic but realistic employment hardship situation.\n\nCurrent input: "${currentValue || "No information provided"}"\n\nProvide a 150-200 word well-structured response that:\n- Describes current or most recent employment\n- Explains any job loss, reduction in hours, or employment challenges\n- Mentions skills and employment history briefly\n- Describes job search efforts if unemployed\n\nKeep the tone respectful and factual.\n\nThe response should be in ${locale} language.`;
        break;
      case "reasonForApplying":
        prompt = `You are an AI assistant helping a UAEcitizen apply for government financial support. The user needs help articulating their reasons for applying for financial assistance. Based on any information they've provided, suggest a detailed and clear explanation.\n\n${personalInfoPrompt}\nIf they've provided some details, enhance and structure it. If they haven't provided anything, create a generic but realistic explanation.\n\nCurrent input: "${currentValue || "No information provided"}"\n\nProvide a 150-200 word well-structured response that:\n- Clearly states the main reason for seeking assistance\n- Explains immediate financial needs\n- Mentions any temporary nature of the hardship\n- Describes how the assistance would help improve their situation\n\nKeep the tone respectful, factual, and avoid exaggeration.\n\nThe response should be in ${locale} language.`;
        break;
      default:
        return NextResponse.json(
          { error: "Invalid field name" },
          { status: 400 }
        );
    }
    
    const response = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: prompt,
        }
      ],
      temperature: 0.7,
      max_tokens: 300,
    });
    
    const suggestion = response.choices[0]?.message?.content || "";
    
    return NextResponse.json({ suggestion });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Failed to generate suggestion" },
      { status: 500 }
    );
  }
} 