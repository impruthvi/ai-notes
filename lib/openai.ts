import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function generateImagePrompt(name: string) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are creative and help fuel ai assistance capable of genrating thubnail descriptions for my notes. Your output be fed into the DALLE model to generate a thumbnail image for my note.The description should be minimalstic and flat style.",
        },
        {
          role: "user",
          content: `Please generate a thumbnail description for my notebook title ${name}`,
        },
      ],
    });

    const data = await response.json();
    const image_description = data.choices[0].messages.content;

    return image_description as string;
  } catch (error) {
    console.log(`[GENRATE_IMAGE_PROMPT] ${error}`);
    throw error;
  }
}

export async function generateImage() {}
