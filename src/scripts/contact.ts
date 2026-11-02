import { z } from "zod";

const endpoint = import.meta.env.PUBLIC_CONTACT_ENDPOINT?.trim() || "";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.email("Enter a valid email address."),
  message: z.string().trim().min(10, "Tell me a little more — at least 10 characters."),
});

type Field = "name" | "email" | "message";

const form = document.querySelector<HTMLFormElement>("[data-contact-form]");

if (form) {
  const fallbackEmail =
    import.meta.env.PUBLIC_CONTACT_EMAIL?.trim() || form.dataset.contactEmail || "";
  const status = form.querySelector<HTMLElement>("[data-form-status]");
  const submit = form.querySelector<HTMLButtonElement>("[data-form-submit]");
  const submitLabel = form.querySelector<HTMLElement>("[data-submit-label]");
  const fields: Field[] = ["name", "email", "message"];
  const input = (field: Field) =>
    form.elements.namedItem(field) as HTMLInputElement | HTMLTextAreaElement | null;
  const errorNode = (field: Field) =>
    form.querySelector<HTMLElement>(`[data-error-for="${field}"]`);

  const setStatus = (message: string, tone: "idle" | "busy" | "success" | "error") => {
    if (!status) return;
    status.textContent = message;
    status.dataset.tone = tone;
  };

  const setFieldError = (field: Field, message: string) => {
    const element = input(field);
    const node = errorNode(field);
    if (element) {
      if (message) element.setAttribute("aria-invalid", "true");
      else element.removeAttribute("aria-invalid");
    }
    if (node) {
      node.textContent = message;
      node.hidden = !message;
    }
  };

  const setBusy = (busy: boolean) => {
    if (!submit) return;
    submit.disabled = busy;
    submit.setAttribute("aria-busy", String(busy));
    if (submitLabel) submitLabel.textContent = busy ? "Sending…" : "Send message";
  };

  fields.forEach((field) => {
    input(field)?.addEventListener("input", () => {
      setFieldError(field, "");
      setStatus("", "idle");
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
      name: input("name")?.value ?? "",
      email: input("email")?.value ?? "",
      message: input("message")?.value ?? "",
    };

    fields.forEach((field) => setFieldError(field, ""));

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const issues = parsed.error.issues;
      issues.forEach((issue) => {
        const field = issue.path[0] as Field;
        if (fields.includes(field)) setFieldError(field, issue.message);
      });
      setStatus("Please check the highlighted fields.", "error");
      const first = issues[0]?.path[0] as Field | undefined;
      if (first) input(first)?.focus();
      return;
    }

    // Honeypot: real people leave this empty.
    const honey = form.querySelector<HTMLInputElement>('[name="company"]')?.value;
    if (honey) return;

    const subject = `Portfolio enquiry from ${parsed.data.name}`;
    const body = `${parsed.data.message}\n\n— ${parsed.data.name} (${parsed.data.email})`;

    if (!endpoint) {
      const mailto = `mailto:${fallbackEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus(
        fallbackEmail
          ? "No form endpoint configured — opening your email client instead."
          : "No form endpoint configured. Use the email link above.",
        "error",
      );
      if (fallbackEmail) window.location.href = mailto;
      return;
    }

    setBusy(true);
    setStatus("Sending…", "busy");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          subject,
          _subject: subject,
        }),
      });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);

      form.reset();
      setStatus("Thanks — your message is on its way. I usually reply within a day.", "success");
    } catch {
      setStatus(
        `Something went wrong sending the form. Email me directly${fallbackEmail ? ` at ${fallbackEmail}` : ""}.`,
        "error",
      );
    } finally {
      setBusy(false);
    }
  });
}
