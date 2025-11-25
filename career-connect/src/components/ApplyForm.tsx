import React, { useState } from "react";

const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

interface ApplyFormProps {
  jobTitle: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  resume?: string;
}

const ApplyForm = ({ jobTitle }: ApplyFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: ValidationErrors = {};

    if (!name.trim()) {
      newErrors.name = "Full Name is required.";
    }
    
    if (!email.trim()) {
      newErrors.email = "Email Address is required.";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!resume) {
      newErrors.resume = "A resume file is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validate()) {
      console.log("Submitting application for:", jobTitle, { name, email, resume });
      
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 1500);

    } else {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mt-4 max-w-md" role="alert">
        <p className="font-bold">Application Received! 🎉</p>
        <p>Your application for <strong>{jobTitle}</strong> has been submitted successfully.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 p-6 border rounded-lg shadow-md max-w-md">
        <h3 className="text-xl font-semibold mb-4">Apply for {jobTitle}</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    className={`p-3 border rounded w-full mt-1 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setErrors(prev => ({ ...prev, name: undefined }));
                    }}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && <p id="name-error" className="text-sm text-red-600 mt-1">{errors.name}</p>}
            </div>

            <div>
                <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                    id="emailAddress"
                    type="email"
                    placeholder="you@example.com"
                    className={`p-3 border rounded w-full mt-1 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors(prev => ({ ...prev, email: undefined }));
                    }}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && <p id="email-error" className="text-sm text-red-600 mt-1">{errors.email}</p>}
            </div>

            <div>
                <label htmlFor="resumeUpload" className="block text-sm font-medium text-gray-700">Upload Resume (PDF/DOCX)</label>
                <input
                    id="resumeUpload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mt-1 ${errors.resume ? 'border-red-500' : ''}`}
                    onChange={(e) => {
                        setResume(e.target.files?.[0] || null);
                        setErrors(prev => ({ ...prev, resume: undefined }));
                    }}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.resume}
                    aria-describedby={errors.resume ? "resume-error" : undefined}
                />
                {errors.resume && <p id="resume-error" className="text-sm text-red-600 mt-1">{errors.resume}</p>}
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
        </form>
    </div>
  );
};

export default ApplyForm;