'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  ArrowLeft,
  Plus,
  X,
  Save,
  Loader2,
  Eye,
  AlertCircle,
  Building2,
  Check,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useDebounce } from '@/hooks/use-debounce';

type InternshipStatus = 'DRAFT' | 'PUBLISHED' | 'CLOSED' | 'ARCHIVED';

interface InternshipFormProps {
  internship?: any;
  isNew?: boolean;
}

interface ValidationErrors {
  [key: string]: string;
}

export default function InternshipForm({
  internship,
  isNew = false,
}: InternshipFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [newItem, setNewItem] = useState('');
  const [currentArrayField, setCurrentArrayField] = useState<string>('');

  const [formData, setFormData] = useState({
    // Basic Info
    title: '',
    company: '',
    status: 'DRAFT' as InternshipStatus,
    internshipType: 'Full-time',

    // Contact
    contactEmail: '',
    contactPhone: '',

    // Location & Logistics
    city: '',
    country: '',
    address: '',
    mode: 'Hybrid',
    remote: false,
    startDate: '',
    durationMonths: 0,
    hoursPerWeek: 40,

    // Dates
    datePosted: new Date().toISOString().split('T')[0],
    validThrough: '',
    applicationDeadline: '',

    // Description & Requirements
    shortDescription: '',
    fullDescription: '',
    responsibilities: [] as string[],
    qualifications: [] as string[],

    // Target Audience
    requiredLevel: '',
    targetSchools: [] as string[],
    allowedFields: [] as string[],
    requiredLanguages: [] as string[],

    // Compensation & Benefits
    isPaid: false,
    salary: 0,
    salaryUnit: 'MAD/month',
    benefits: [] as string[],
    employmentType: 'Internship',

    // Application Process
    applyMethod: 'platform',
    externalUrl: '',
    requiredDocs: ['CV'] as string[],
    requires_cv: true,
    autoClose: false,
    maxApplications: 0,

    // Admin Options
    visibility: 'public',
    tags: [] as string[],
    adminNotes: '',
  });

  // Debounced form data for autosave
  const debouncedFormData = useDebounce(formData, 2000);

  useEffect(() => {
    if (internship && !isNew) {
      setFormData({
        title: internship.title || '',
        company: internship.company || '',
        status: internship.status || 'DRAFT',
        internshipType: internship.internshipType || 'Full-time',
        contactEmail: internship.contactEmail || '',
        contactPhone: internship.contactPhone || '',
        city: internship.city || '',
        country: internship.country || '',
        address: internship.address || '',
        mode: internship.mode || 'Hybrid',
        remote: internship.remote || false,
        startDate: internship.startDate
          ? new Date(internship.startDate).toISOString().split('T')[0]
          : '',
        durationMonths: internship.durationMonths || 0,
        hoursPerWeek: internship.hoursPerWeek || 40,
        datePosted: internship.datePosted
          ? new Date(internship.datePosted).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        validThrough: internship.validThrough
          ? new Date(internship.validThrough).toISOString().split('T')[0]
          : '',
        applicationDeadline: internship.applicationDeadline
          ? new Date(internship.applicationDeadline).toISOString().split('T')[0]
          : '',
        shortDescription: internship.shortDescription || '',
        fullDescription: internship.fullDescription || '',
        responsibilities: internship.responsibilities || [],
        qualifications: internship.qualifications || [],
        requiredLevel: internship.requiredLevel || '',
        targetSchools: internship.targetSchools || [],
        allowedFields: internship.allowedFields || [],
        requiredLanguages: internship.requiredLanguages || [],
        isPaid: internship.isPaid || false,
        salary: internship.salary || 0,
        salaryUnit: internship.salaryUnit || 'MAD/month',
        benefits: internship.benefits || [],
        employmentType: internship.employmentType || 'Internship',
        applyMethod: internship.applyMethod || 'platform',
        externalUrl: internship.externalUrl || '',
        requiredDocs: internship.requiredDocs || ['CV'],
        requires_cv: internship.requires_cv ?? true,
        autoClose: internship.autoClose || false,
        maxApplications: internship.maxApplications || 0,
        visibility: internship.visibility || 'public',
        tags: internship.tags || [],
        adminNotes: internship.adminNotes || '',
      });
    }
  }, [internship, isNew]);

  // Autosave effect
  useEffect(() => {
    if (!isNew && internship?.id && debouncedFormData.title) {
      handleAutosave();
    }
  }, [debouncedFormData]);

  const handleAutosave = async () => {
    if (isAutoSaving || isSaving) return;

    setIsAutoSaving(true);
    try {
      const response = await fetch(`/api/admin/internships/${internship.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setLastSaved(new Date());
      }
    } catch (error) {
      console.error('Autosave failed:', error);
    } finally {
      setIsAutoSaving(false);
    }
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    // Required fields
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.company.trim()) errors.company = 'Company is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.country.trim()) errors.country = 'Country is required';
    if (!formData.contactEmail.trim())
      errors.contactEmail = 'Contact email is required';
    if (!formData.contactPhone.trim())
      errors.contactPhone = 'Contact phone is required';
    if (!formData.shortDescription.trim())
      errors.shortDescription = 'Short description is required';
    if (!formData.fullDescription.trim())
      errors.fullDescription = 'Full description is required';
    if (!formData.requiredLevel.trim())
      errors.requiredLevel = 'Required level is required';

    // Email validation
    if (
      formData.contactEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)
    ) {
      errors.contactEmail = 'Invalid email format';
    }

    // External URL validation
    if (formData.applyMethod === 'external' && !formData.externalUrl.trim()) {
      errors.externalUrl = 'External URL is required for external applications';
    }

    // Publishing validation
    if (formData.status === 'PUBLISHED') {
      if (!formData.applicationDeadline) {
        errors.applicationDeadline =
          'Application deadline is required for published internships';
      }
      if (formData.responsibilities.length === 0) {
        errors.responsibilities =
          'At least one responsibility is required for publishing';
      }
      if (formData.qualifications.length === 0) {
        errors.qualifications =
          'At least one qualification is required for publishing';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent, publish = false) => {
    e.preventDefault();

    // Set status to PUBLISHED if publish button was clicked
    const dataToSubmit = publish
      ? { ...formData, status: 'PUBLISHED' as InternshipStatus }
      : formData;

    // Validate only if publishing
    if (publish && !validateForm()) {
      toast.error('Please fix validation errors before publishing');
      return;
    }

    setIsSaving(true);
    try {
      const url = isNew
        ? '/api/admin/internships'
        : `/api/admin/internships/${internship.id}`;

      const method = isNew ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save internship');
      }

      const data = await response.json();
      toast.success(
        publish
          ? 'Internship published successfully!'
          : isNew
          ? 'Internship created successfully!'
          : 'Internship updated successfully!'
      );

      router.push('/admin/internships');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    // Open preview in new tab
    const previewData = encodeURIComponent(JSON.stringify(formData));
    window.open(`/admin/internships/preview?data=${previewData}`, '_blank');
  };

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const addArrayItem = (field: string, value: string) => {
    if (!value.trim()) return;
    setFormData((prev) => ({
      ...prev,
      [field]: [
        ...(prev[field as keyof typeof prev] as string[]),
        value.trim(),
      ],
    }));
    setNewItem('');
    setCurrentArrayField('');
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter(
        (_, i) => i !== index
      ),
    }));
  };

  const toggleCheckbox = (field: string, value: string) => {
    const currentValues = formData[field as keyof typeof formData] as string[];
    if (currentValues.includes(value)) {
      updateField(
        field,
        currentValues.filter((v) => v !== value)
      );
    } else {
      updateField(field, [...currentValues, value]);
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/admin/internships')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {isNew ? 'Create New Internship' : 'Edit Internship'}
            </h1>
            {lastSaved && (
              <p className="text-sm text-muted-foreground mt-1">
                {isAutoSaving ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Saving...
                  </span>
                ) : (
                  `Last saved: ${lastSaved.toLocaleTimeString()}`
                )}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handlePreview}
            disabled={!formData.title || !formData.company}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button
            variant="outline"
            onClick={(e) => handleSubmit(e, false)}
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Draft
          </Button>
          <Button onClick={(e) => handleSubmit(e, true)} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Check className="h-4 w-4 mr-2" />
            )}
            Publish
          </Button>
        </div>
      </div>

      {/* Validation Errors Alert */}
      {Object.keys(validationErrors).length > 0 && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <p className="font-medium mb-2">Please fix the following errors:</p>
            <ul className="list-disc list-inside space-y-1">
              {Object.values(validationErrors).map((error, idx) => (
                <li key={idx} className="text-sm">
                  {error}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
        {/* Section 1: Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Core details about the internship</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="title">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="e.g., Full Stack Developer Intern"
                  className={validationErrors.title ? 'border-red-500' : ''}
                />
                {validationErrors.title && (
                  <p className="text-sm text-red-500 mt-1">
                    {validationErrors.title}
                  </p>
                )}
              </div>

              <div className="col-span-2">
                <Label htmlFor="company">
                  Company <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => updateField('company', e.target.value)}
                    placeholder="Search or enter company name"
                    className={validationErrors.company ? 'border-red-500' : ''}
                  />
                  <Button type="button" variant="outline" size="icon">
                    <Building2 className="h-4 w-4" />
                  </Button>
                </div>
                {validationErrors.company && (
                  <p className="text-sm text-red-500 mt-1">
                    {validationErrors.company}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Type to search existing companies or enter a new one
                </p>
              </div>

              <div>
                <Label htmlFor="internshipType">Internship Type</Label>
                <Select
                  value={formData.internshipType}
                  onValueChange={(value) =>
                    updateField('internshipType', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Project-based">Project-based</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    updateField('status', value as InternshipStatus)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="PUBLISHED">Published</SelectItem>
                    <SelectItem value="CLOSED">Closed</SelectItem>
                    <SelectItem value="ARCHIVED">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="contactEmail">
                  Contact Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => updateField('contactEmail', e.target.value)}
                  placeholder="hr@company.com"
                  className={
                    validationErrors.contactEmail ? 'border-red-500' : ''
                  }
                />
                {validationErrors.contactEmail && (
                  <p className="text-sm text-red-500 mt-1">
                    {validationErrors.contactEmail}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="contactPhone">
                  Contact Phone <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) => updateField('contactPhone', e.target.value)}
                  placeholder="+212 6XX XXX XXX"
                  className={
                    validationErrors.contactPhone ? 'border-red-500' : ''
                  }
                />
                {validationErrors.contactPhone && (
                  <p className="text-sm text-red-500 mt-1">
                    {validationErrors.contactPhone}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Location & Logistics */}
        <Card>
          <CardHeader>
            <CardTitle>Location & Logistics</CardTitle>
            <CardDescription>
              Where and when the internship takes place
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">
                  City <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  placeholder="Casablanca"
                  className={validationErrors.city ? 'border-red-500' : ''}
                />
                {validationErrors.city && (
                  <p className="text-sm text-red-500 mt-1">
                    {validationErrors.city}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="country">
                  Country <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => updateField('country', e.target.value)}
                  placeholder="Morocco"
                  className={validationErrors.country ? 'border-red-500' : ''}
                />
                {validationErrors.country && (
                  <p className="text-sm text-red-500 mt-1">
                    {validationErrors.country}
                  </p>
                )}
              </div>

              <div className="col-span-2">
                <Label htmlFor="address">Full Address (Optional)</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  placeholder="123 Street Name, District"
                />
              </div>

              <div>
                <Label htmlFor="mode">Work Mode</Label>
                <Select
                  value={formData.mode}
                  onValueChange={(value) => updateField('mode', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="On-site">On-site</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2 pt-8">
                <Checkbox
                  id="remote"
                  checked={formData.remote}
                  onCheckedChange={(checked) =>
                    updateField('remote', checked === true)
                  }
                />
                <Label htmlFor="remote" className="cursor-pointer">
                  Allow fully remote work
                </Label>
              </div>

              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => updateField('startDate', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="durationMonths">Duration (Months)</Label>
                <Input
                  id="durationMonths"
                  type="number"
                  min="0"
                  value={formData.durationMonths}
                  onChange={(e) =>
                    updateField('durationMonths', parseInt(e.target.value) || 0)
                  }
                  placeholder="3"
                />
              </div>

              <div>
                <Label htmlFor="hoursPerWeek">Hours per Week</Label>
                <Input
                  id="hoursPerWeek"
                  type="number"
                  min="0"
                  value={formData.hoursPerWeek}
                  onChange={(e) =>
                    updateField('hoursPerWeek', parseInt(e.target.value) || 0)
                  }
                  placeholder="40"
                />
              </div>

              <div>
                <Label htmlFor="applicationDeadline">
                  Application Deadline
                  {formData.status === 'PUBLISHED' && (
                    <span className="text-red-500"> *</span>
                  )}
                </Label>
                <Input
                  id="applicationDeadline"
                  type="date"
                  value={formData.applicationDeadline}
                  onChange={(e) =>
                    updateField('applicationDeadline', e.target.value)
                  }
                  className={
                    validationErrors.applicationDeadline ? 'border-red-500' : ''
                  }
                />
                {validationErrors.applicationDeadline && (
                  <p className="text-sm text-red-500 mt-1">
                    {validationErrors.applicationDeadline}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Description & Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Description & Requirements</CardTitle>
            <CardDescription>
              Detailed internship information and expectations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="shortDescription">
                Short Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="shortDescription"
                value={formData.shortDescription}
                onChange={(e) =>
                  updateField('shortDescription', e.target.value)
                }
                placeholder="Brief summary (1-2 sentences) for listing pages..."
                rows={2}
                className={
                  validationErrors.shortDescription ? 'border-red-500' : ''
                }
              />
              {validationErrors.shortDescription && (
                <p className="text-sm text-red-500 mt-1">
                  {validationErrors.shortDescription}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                {formData.shortDescription.length} / 200 characters
              </p>
            </div>

            <div>
              <Label htmlFor="fullDescription">
                Full Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="fullDescription"
                value={formData.fullDescription}
                onChange={(e) => updateField('fullDescription', e.target.value)}
                placeholder="Detailed description of the internship, company culture, team structure, etc. You can use **bold**, bullet points, and links."
                rows={8}
                className={
                  validationErrors.fullDescription ? 'border-red-500' : ''
                }
              />
              {validationErrors.fullDescription && (
                <p className="text-sm text-red-500 mt-1">
                  {validationErrors.fullDescription}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Supports Markdown: **bold**, - bullets, [links](url)
              </p>
            </div>

            <Separator />

            <div>
              <Label>
                Responsibilities
                {formData.status === 'PUBLISHED' && (
                  <span className="text-red-500"> *</span>
                )}
              </Label>
              <div className="space-y-2">
                {formData.responsibilities.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-muted rounded"
                  >
                    <span className="flex-1">{item}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem('responsibilities', index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    value={
                      currentArrayField === 'responsibilities' ? newItem : ''
                    }
                    onChange={(e) => {
                      setNewItem(e.target.value);
                      setCurrentArrayField('responsibilities');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addArrayItem('responsibilities', newItem);
                      }
                    }}
                    placeholder="Add a responsibility..."
                    className={
                      validationErrors.responsibilities ? 'border-red-500' : ''
                    }
                  />
                  <Button
                    type="button"
                    onClick={() => addArrayItem('responsibilities', newItem)}
                    disabled={!newItem.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {validationErrors.responsibilities && (
                  <p className="text-sm text-red-500">
                    {validationErrors.responsibilities}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label>
                Qualifications / Skills Required
                {formData.status === 'PUBLISHED' && (
                  <span className="text-red-500"> *</span>
                )}
              </Label>
              <div className="space-y-2">
                {formData.qualifications.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-muted rounded"
                  >
                    <span className="flex-1">{item}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem('qualifications', index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    value={
                      currentArrayField === 'qualifications' ? newItem : ''
                    }
                    onChange={(e) => {
                      setNewItem(e.target.value);
                      setCurrentArrayField('qualifications');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addArrayItem('qualifications', newItem);
                      }
                    }}
                    placeholder="Add a qualification or skill..."
                    className={
                      validationErrors.qualifications ? 'border-red-500' : ''
                    }
                  />
                  <Button
                    type="button"
                    onClick={() => addArrayItem('qualifications', newItem)}
                    disabled={!newItem.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {validationErrors.qualifications && (
                  <p className="text-sm text-red-500">
                    {validationErrors.qualifications}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Target Audience */}
        <Card>
          <CardHeader>
            <CardTitle>Target Audience</CardTitle>
            <CardDescription>
              Academic level, fields, schools, and language requirements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="requiredLevel">
                Required Academic Level <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.requiredLevel}
                onValueChange={(value) => updateField('requiredLevel', value)}
              >
                <SelectTrigger
                  className={
                    validationErrors.requiredLevel ? 'border-red-500' : ''
                  }
                >
                  <SelectValue placeholder="Select level..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bac+2">Bac+2</SelectItem>
                  <SelectItem value="Bac+3">Bac+3</SelectItem>
                  <SelectItem value="Bac+4">Bac+4</SelectItem>
                  <SelectItem value="Bac+5">Bac+5</SelectItem>
                  <SelectItem value="PhD">PhD</SelectItem>
                  <SelectItem value="Any">Any Level</SelectItem>
                </SelectContent>
              </Select>
              {validationErrors.requiredLevel && (
                <p className="text-sm text-red-500 mt-1">
                  {validationErrors.requiredLevel}
                </p>
              )}
            </div>

            <div>
              <Label>Target Schools (Optional)</Label>
              <div className="space-y-2">
                {formData.targetSchools.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-muted rounded"
                  >
                    <span className="flex-1">{item}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem('targetSchools', index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    value={currentArrayField === 'targetSchools' ? newItem : ''}
                    onChange={(e) => {
                      setNewItem(e.target.value);
                      setCurrentArrayField('targetSchools');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addArrayItem('targetSchools', newItem);
                      }
                    }}
                    placeholder="e.g., ENSAM, INPT, etc."
                  />
                  <Button
                    type="button"
                    onClick={() => addArrayItem('targetSchools', newItem)}
                    disabled={!newItem.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Label>Allowed Fields / Majors</Label>
              <div className="space-y-2">
                {formData.allowedFields.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-muted rounded"
                  >
                    <span className="flex-1">{item}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem('allowedFields', index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    value={currentArrayField === 'allowedFields' ? newItem : ''}
                    onChange={(e) => {
                      setNewItem(e.target.value);
                      setCurrentArrayField('allowedFields');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addArrayItem('allowedFields', newItem);
                      }
                    }}
                    placeholder="e.g., Computer Science, Engineering, etc."
                  />
                  <Button
                    type="button"
                    onClick={() => addArrayItem('allowedFields', newItem)}
                    disabled={!newItem.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Label>Required Languages</Label>
              <div className="space-y-2">
                {formData.requiredLanguages.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-muted rounded"
                  >
                    <span className="flex-1">{item}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        removeArrayItem('requiredLanguages', index)
                      }
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    value={
                      currentArrayField === 'requiredLanguages' ? newItem : ''
                    }
                    onChange={(e) => {
                      setNewItem(e.target.value);
                      setCurrentArrayField('requiredLanguages');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addArrayItem('requiredLanguages', newItem);
                      }
                    }}
                    placeholder="e.g., French, English, Arabic"
                  />
                  <Button
                    type="button"
                    onClick={() => addArrayItem('requiredLanguages', newItem)}
                    disabled={!newItem.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 5: Compensation & Benefits */}
        <Card>
          <CardHeader>
            <CardTitle>Compensation & Benefits</CardTitle>
            <CardDescription>
              Salary, stipend, and other benefits offered
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isPaid"
                checked={formData.isPaid}
                onCheckedChange={(checked) =>
                  updateField('isPaid', checked === true)
                }
              />
              <Label htmlFor="isPaid" className="cursor-pointer">
                This is a paid internship
              </Label>
            </div>

            {formData.isPaid && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="salary">Salary Amount</Label>
                  <Input
                    id="salary"
                    type="number"
                    min="0"
                    value={formData.salary}
                    onChange={(e) =>
                      updateField('salary', parseInt(e.target.value) || 0)
                    }
                    placeholder="3000"
                  />
                </div>

                <div>
                  <Label htmlFor="salaryUnit">Salary Unit</Label>
                  <Select
                    value={formData.salaryUnit}
                    onValueChange={(value) => updateField('salaryUnit', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MAD/month">MAD/month</SelectItem>
                      <SelectItem value="MAD/hour">MAD/hour</SelectItem>
                      <SelectItem value="Stipend">Stipend</SelectItem>
                      <SelectItem value="EUR/month">EUR/month</SelectItem>
                      <SelectItem value="USD/month">USD/month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div>
              <Label>Benefits & Perks</Label>
              <div className="space-y-2">
                {formData.benefits.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-muted rounded"
                  >
                    <span className="flex-1">{item}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem('benefits', index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    value={currentArrayField === 'benefits' ? newItem : ''}
                    onChange={(e) => {
                      setNewItem(e.target.value);
                      setCurrentArrayField('benefits');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addArrayItem('benefits', newItem);
                      }
                    }}
                    placeholder="e.g., Mentoring, Transport allowance, Free lunch"
                  />
                  <Button
                    type="button"
                    onClick={() => addArrayItem('benefits', newItem)}
                    disabled={!newItem.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Add benefits like mentoring, meals, transport, equipment, etc.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 6: Application Process */}
        <Card>
          <CardHeader>
            <CardTitle>Application Process</CardTitle>
            <CardDescription>
              How students should apply and what documents are required
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="applyMethod">Application Method</Label>
              <Select
                value={formData.applyMethod}
                onValueChange={(value) => updateField('applyMethod', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="platform">Apply on Platform</SelectItem>
                  <SelectItem value="external">External URL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.applyMethod === 'external' && (
              <div>
                <Label htmlFor="externalUrl">
                  External Application URL{' '}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="externalUrl"
                  type="url"
                  value={formData.externalUrl}
                  onChange={(e) => updateField('externalUrl', e.target.value)}
                  placeholder="https://company.com/apply"
                  className={
                    validationErrors.externalUrl ? 'border-red-500' : ''
                  }
                />
                {validationErrors.externalUrl && (
                  <p className="text-sm text-red-500 mt-1">
                    {validationErrors.externalUrl}
                  </p>
                )}
              </div>
            )}

            <div>
              <Label>Required Documents</Label>
              <div className="space-y-2">
                {['CV', 'Cover Letter', 'Portfolio', 'Transcript', 'Other'].map(
                  (doc) => (
                    <div key={doc} className="flex items-center space-x-2">
                      <Checkbox
                        id={`doc-${doc}`}
                        checked={formData.requiredDocs.includes(doc)}
                        onCheckedChange={() =>
                          toggleCheckbox('requiredDocs', doc)
                        }
                      />
                      <Label
                        htmlFor={`doc-${doc}`}
                        className="cursor-pointer font-normal"
                      >
                        {doc}
                      </Label>
                    </div>
                  )
                )}
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maxApplications">
                  Max Applications (Optional)
                </Label>
                <Input
                  id="maxApplications"
                  type="number"
                  min="0"
                  value={formData.maxApplications}
                  onChange={(e) =>
                    updateField(
                      'maxApplications',
                      parseInt(e.target.value) || 0
                    )
                  }
                  placeholder="Leave 0 for unlimited"
                />
              </div>

              <div className="flex items-center space-x-2 pt-8">
                <Checkbox
                  id="autoClose"
                  checked={formData.autoClose}
                  onCheckedChange={(checked) =>
                    updateField('autoClose', checked === true)
                  }
                />
                <Label htmlFor="autoClose" className="cursor-pointer">
                  Auto-close when max reached
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 7: Admin Options */}
        <Card>
          <CardHeader>
            <CardTitle>Admin Options</CardTitle>
            <CardDescription>
              Visibility, tags, and internal notes (not visible to students)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="visibility">Visibility</Label>
              <Select
                value={formData.visibility}
                onValueChange={(value) => updateField('visibility', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public (All students)</SelectItem>
                  <SelectItem value="hidden">Hidden (Test only)</SelectItem>
                  <SelectItem value="partner_schools">
                    Partner Schools Only
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Tags</Label>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 p-0"
                        onClick={() => removeArrayItem('tags', index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={currentArrayField === 'tags' ? newItem : ''}
                    onChange={(e) => {
                      setNewItem(e.target.value);
                      setCurrentArrayField('tags');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addArrayItem('tags', newItem);
                      }
                    }}
                    placeholder="e.g., Featured, Top Company, Urgent"
                  />
                  <Button
                    type="button"
                    onClick={() => addArrayItem('tags', newItem)}
                    disabled={!newItem.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Common tags: Featured, Top Company, Urgent, Remote-OK
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="adminNotes">Internal Admin Notes (Private)</Label>
              <Textarea
                id="adminNotes"
                value={formData.adminNotes}
                onChange={(e) => updateField('adminNotes', e.target.value)}
                placeholder="Internal comments, follow-up notes, or reminders..."
                rows={4}
              />
              <p className="text-xs text-muted-foreground mt-1">
                These notes are only visible to administrators
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Actions */}
        <div className="flex justify-between items-center sticky bottom-0 bg-background border-t pt-4 pb-6">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push('/admin/internships')}
          >
            Cancel
          </Button>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handlePreview}
              disabled={!formData.title || !formData.company}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview as Student
            </Button>
            <Button type="submit" variant="outline" disabled={isSaving}>
              {isSaving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Draft
            </Button>
            <Button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              disabled={isSaving}
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Check className="h-4 w-4 mr-2" />
              )}
              Publish Internship
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
