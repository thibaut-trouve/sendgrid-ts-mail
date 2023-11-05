export interface SendGridTemplate {
  id: string;
  name: string;
  generation: string;
  updated_at: string;
  versions: string[];
}

export interface SendgridTemplateDetail {
  id: string;
  name: string;
  generation: "dynamic";
  updated_at: string;
  versions: {
    id: string;
    user_id: number;
    template_id: string;
    active: number;
    name: string;
    html_content: string;
    plain_content: string;
    generate_plain_content: boolean;
    subject: string;
    updated_at: string;
    editor: string;
    test_data: string;
    thumbnail_url: string;
  }[];
}

export async function fetchSendGridTemplates(apiKey: string): Promise<SendGridTemplate[]> {
  const apiUrl = "https://api.sendgrid.com/v3/templates?generations=dynamic";

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch SendGrid templates: HTTP ${response.status}`);
    }

    return (await response.json()).templates;
  } catch (error: any) {
    throw new Error(`Failed to fetch SendGrid templates: ${error.message}`);
  }
}

export async function fetchSendGridTemplate(
  apiKey: string,
  templateId: string,
): Promise<SendgridTemplateDetail> {
  const apiUrl = `https://api.sendgrid.com/v3/templates/${templateId}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch SendGrid templates: HTTP ${response.status}`);
    }

    return (await response.json()) as SendgridTemplateDetail;
  } catch (error: any) {
    throw new Error(`Failed to fetch SendGrid templates: ${error.message}`);
  }
}
