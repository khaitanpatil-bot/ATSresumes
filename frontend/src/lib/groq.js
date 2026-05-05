import Groq from 'groq-sdk';

const apiKey = import.meta.env.VITE_GROQ_API_KEY;

if (!apiKey) {
  console.warn("VITE_GROQ_API_KEY is not set in your environment variables. Groq API calls will fail.");
}

const groq = new Groq({
  apiKey: apiKey || 'dummy-key',
  dangerouslyAllowBrowser: true 
});

export const scanResume = async (resumeText) => {
  try {
    const prompt = `You are an expert ATS (Applicant Tracking System) software used by top-tier recruiters.
Your job is to evaluate the following resume text.
Always reply with valid JSON formatting under these strict keys:
{
  "atsScore": Number (0-100 indicating quality and ATS readability),
  "scoreItems": Array of 5 Objects with keys 'label' (String, e.g. 'Keywords Match', 'Formatting') and 'value' (String, percentage like '85%'),
  "issuesFound": Array of Strings (3-5 concise actionable points for improvement)
}

Resume Text:
${resumeText}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.2,
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(completion.choices[0].message.content);
    return result;
  } catch (error) {
    console.error("Groq ATS Scan Error:", error);
    throw error;
  }
};

export const matchJobDescription = async (resumeText, jobDescription) => {
  try {
    const prompt = `You are a strict, precise expert recruiter matching a candidate's resume to a job description.
Always reply with valid JSON formatting under these strict keys:
{
  "matchScore": Number (0-100 indicating how well the candidate matches the requirements),
  "missingKeywords": Array of Strings (3-7 key skills or technologies in the job desc missing from the resume),
  "recommendedChanges": String (1-2 sentences of the most critical change to make to align with the job)
}

Job Description:
${jobDescription}

Resume Text:
${resumeText}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.2,
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(completion.choices[0].message.content);
    return result;
  } catch (error) {
    console.error("Groq Job Match Error:", error);
    throw error;
  }
};
