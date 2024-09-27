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
            "Generate a minimalistic, flat-style thumbnail that visually captures the essence of the note's title. Use simple, clean shapes and icons related to note-taking, such as notebooks, pencils, or digital devices. Incorporate subtle, soft colors with a flat background to maintain a professional and modern look. The design should be clear and easily recognizable at a small size, ensuring that it conveys the main idea of the note without excessive detail",
        },
        {
          role: "user",
          content: `Please generate a thumbnail description for my notebook title ${name}`,
        },
      ],
    });

    const data = await response.json();
    const image_description = data.choices[0].message.content;
    return image_description as string;
  } catch (error) {
    console.log(`[GENRATE_IMAGE_PROMPT] ${error}`);
    throw error;
  }
}

export async function generateImage(image_description: string) {
  try {
    const response = await openai.createImage({
      prompt: image_description,
      n: 1,
      size: "256x256",
    });

    const data = await response.json();
    const image_url = data.data[0].url;;

    return image_url as string;
  } catch (error) {
    console.log(`[GENRATE_IMAGE_DALLI] ${error}`);
    throw error;
  }
}
