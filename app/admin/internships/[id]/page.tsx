'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import InternshipForm from '../InternshipForm';
import { Loader2 } from 'lucide-react';

export default function EditInternshipPage() {
  const params = useParams();
  const [internship, setInternship] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const response = await fetch(`/api/admin/internships/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setInternship(data.internship);
        }
      } catch (error) {
        console.error('Failed to fetch internship:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchInternship();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Internship not found</h2>
          <p className="text-muted-foreground">
            The internship you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return <InternshipForm internship={internship} isNew={false} />;
}
