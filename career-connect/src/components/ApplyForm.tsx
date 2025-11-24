interface ApplyFormProps {
  jobTitle: string;
}

const ApplyForm = ({ jobTitle }: ApplyFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !resume) {
      alert("Please fill in all required fields.");
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className="text-green-700 font-semibold mt-4">
        Your application for <strong>{jobTitle}</strong> has been submitted.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <input
        type="text"
        placeholder="Full Name"
        className="p-2 border rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-label="Full Name"
      />

      <input
        type="email"
        placeholder="Email Address"
        className="p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email Address"
      />

      <input
        type="file"
        className="p-2 border rounded"
        onChange={(e) => setResume(e.target.files?.[0] || null)}
        aria-label="Resume Upload"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit Application
      </button>
    </form>
  );
};

export default ApplyForm;
