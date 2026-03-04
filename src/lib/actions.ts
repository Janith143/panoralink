'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { cwd } from 'process';
import { auth, signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { sendEmail } from '@/lib/email';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function logout() {
    const { signOut } = await import('@/auth');
    await signOut();
}

// Partner Logo Actions
const PartnerLogoSchema = z.object({
    name: z.string().min(1, "Name is required"),
    image: z.string().min(1, "Image URL is required"),
    link: z.string().optional(),
});

export async function addPartnerLogo(formData: FormData) {
    const name = formData.get('name');
    const image = formData.get('image');
    const link = formData.get('link');

    let imagePath = '';

    if (image instanceof File && image.size > 0) {
        try {
            const buffer = Buffer.from(await image.arrayBuffer());
            const filename = `${Date.now()}-${image.name.replace(/\s+/g, '-')}`;
            const uploadDir = join(cwd(), 'public', 'uploads');

            // Ensure directory exists (redundant if checking globally, but safe)
            // await mkdir(uploadDir, { recursive: true }); 

            await writeFile(join(uploadDir, filename), buffer);
            imagePath = `/uploads/${filename}`;
        } catch (error) {
            console.error('Error uploading file:', error);
            return { success: false, error: 'Failed to upload image' };
        }
    } else if (typeof image === 'string') {
        imagePath = image;
    }

    const rawData = {
        name,
        image: imagePath,
        link,
    };

    const validatedData = PartnerLogoSchema.safeParse(rawData);

    if (!validatedData.success) {
        return { success: false, error: validatedData.error.flatten().fieldErrors };
    }

    try {
        await prisma.partnerLogo.create({
            data: {
                name: validatedData.data.name,
                image: validatedData.data.image,
                link: validatedData.data.link || null,
            },
        });
        revalidatePath('/');
        revalidatePath('/admin/logos');
        return { success: true };
    } catch (error) {
        console.error('Failed to add partner logo:', error);
        return { success: false, error: 'Failed to add logo' };
    }
}

export async function deletePartnerLogo(id: string) {
    try {
        await prisma.partnerLogo.delete({
            where: { id },
        });
        revalidatePath('/');
        revalidatePath('/admin/logos');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete partner logo:', error);
        return { success: false, error: 'Failed to delete logo' };
    }
}

// Brand Product Actions
const BrandProductSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    image: z.string().min(1, "Image URL is required"),
    link: z.string().optional(),
    tag: z.string().optional(),
});

export async function addBrandProduct(formData: FormData) {
    const name = formData.get('name');
    const description = formData.get('description');
    const image = formData.get('image');
    const link = formData.get('link');
    const tag = formData.get('tag');

    let imagePath = '';

    if (image instanceof File && image.size > 0) {
        try {
            const buffer = Buffer.from(await image.arrayBuffer());
            const filename = `${Date.now()}-${image.name.replace(/\s+/g, '-')}`;
            const uploadDir = join(cwd(), 'public', 'uploads');

            await writeFile(join(uploadDir, filename), buffer);
            imagePath = `/uploads/${filename}`;
        } catch (error) {
            console.error('Error uploading file:', error);
            return { success: false, error: 'Failed to upload image' };
        }
    } else if (typeof image === 'string') {
        imagePath = image;
    }

    const rawData = {
        name,
        description,
        image: imagePath,
        link,
        tag,
    };

    const validatedData = BrandProductSchema.safeParse(rawData);

    if (!validatedData.success) {
        return { success: false, error: validatedData.error.flatten().fieldErrors };
    }

    try {
        await prisma.brandProduct.create({
            data: {
                name: validatedData.data.name,
                description: validatedData.data.description,
                image: validatedData.data.image,
                link: validatedData.data.link || null,
                tag: validatedData.data.tag || null,
            },
        });
        revalidatePath('/');
        revalidatePath('/admin/brands');
        return { success: true };
    } catch (error) {
        console.error('Failed to add brand product:', error);
        return { success: false, error: 'Failed to add brand product' };
    }
}

export async function deleteBrandProduct(id: string) {
    try {
        await prisma.brandProduct.delete({
            where: { id },
        });
        revalidatePath('/');
        revalidatePath('/admin/brands');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete brand product:', error);
        return { success: false, error: 'Failed to delete brand product' };
    }
}

export async function updateBrandProduct(id: string, formData: FormData) {
    const name = formData.get('name');
    const description = formData.get('description');
    const image = formData.get('image');
    const currentImage = formData.get('currentImage'); // Hidden field
    const link = formData.get('link');
    const tag = formData.get('tag');

    let imagePath = currentImage as string;

    if (image instanceof File && image.size > 0) {
        try {
            const buffer = Buffer.from(await image.arrayBuffer());
            const filename = `${Date.now()}-${image.name.replace(/\s+/g, '-')}`;
            const uploadDir = join(cwd(), 'public', 'uploads');
            await writeFile(join(uploadDir, filename), buffer);
            imagePath = `/uploads/${filename}`;
        } catch (error) {
            console.error('Error uploading file:', error);
            return { success: false, error: 'Failed to upload image' };
        }
    }

    const rawData = {
        name,
        description,
        image: imagePath,
        link,
        tag,
    };

    const validatedData = BrandProductSchema.safeParse(rawData);

    if (!validatedData.success) {
        return { success: false, error: validatedData.error.flatten().fieldErrors };
    }

    try {
        await prisma.brandProduct.update({
            where: { id },
            data: {
                name: validatedData.data.name,
                description: validatedData.data.description,
                image: validatedData.data.image,
                link: validatedData.data.link || null,
                tag: validatedData.data.tag || null,
            },
        });
        revalidatePath('/');
        revalidatePath('/admin/brands');
        redirect('/admin/brands');
    } catch (error) {
        console.error('Failed to update brand product:', error);
        return { success: false, error: 'Failed to update brand product' };
    }
}

// Sub Product Actions
const SubProductSchema = z.object({
    name: z.string().min(1, "Name is required"),
    shortDescription: z.string().min(1, "Short description is required"), // JSON stringified array
    longDescription: z.string().min(1, "Long description is required"),
    image: z.string().min(1, "Image URL is required"),
    price: z.string().min(1, "Price is required"),
    whatsapp: z.string().optional(),
    brandProductId: z.string().min(1, "Brand Product ID is required"),
    galleryImages: z.string().optional(), // JSON stringified array
});

export async function addSubProduct(formData: FormData) {
    const name = formData.get('name');
    const shortDescription = formData.get('shortDescription');
    const longDescription = formData.get('longDescription');
    const image = formData.get('image');
    const price = formData.get('price');
    const whatsapp = formData.get('whatsapp');
    const brandProductId = formData.get('brandProductId');
    const galleryImages = formData.get('galleryImages');

    let imagePath = '';

    // Handle main image upload
    if (image instanceof File && image.size > 0) {
        try {
            const buffer = Buffer.from(await image.arrayBuffer());
            const filename = `${Date.now()}-${image.name.replace(/\s+/g, '-')}`;
            const uploadDir = join(cwd(), 'public', 'uploads');
            await writeFile(join(uploadDir, filename), buffer);
            imagePath = `/uploads/${filename}`;
        } catch (error) {
            console.error('Error uploading file:', error);
            return { success: false, error: 'Failed to upload image' };
        }
    } else if (typeof image === 'string') {
        imagePath = image;
    }

    const rawData = {
        name,
        shortDescription,
        longDescription,
        image: imagePath,
        price,
        whatsapp,
        brandProductId,
        galleryImages,
    };

    const validatedData = SubProductSchema.safeParse(rawData);

    if (!validatedData.success) {
        return { success: false, error: validatedData.error.flatten().fieldErrors };
    }

    try {
        let parsedShortDesc = [];
        try {
            parsedShortDesc = JSON.parse(validatedData.data.shortDescription);
        } catch (e) {
            parsedShortDesc = [validatedData.data.shortDescription];
        }

        let parsedGalleryImages = [];
        try {
            if (validatedData.data.galleryImages) {
                parsedGalleryImages = JSON.parse(validatedData.data.galleryImages);
            }
        } catch (e) {
            parsedGalleryImages = [];
        }

        await prisma.subProduct.create({
            data: {
                name: validatedData.data.name,
                image: validatedData.data.image,
                shortDescription: parsedShortDesc,
                longDescription: validatedData.data.longDescription,
                price: validatedData.data.price,
                whatsapp: validatedData.data.whatsapp || null,
                brandProductId: validatedData.data.brandProductId,
                galleryImages: parsedGalleryImages,
            },
        });
        revalidatePath('/');
        revalidatePath(`/admin/brands/${validatedData.data.brandProductId}`);
        return { success: true };
    } catch (error) {
        console.error('Failed to add sub product:', error);
        return { success: false, error: 'Failed to add sub product' };
    }
}

export async function deleteSubProduct(id: string, brandId: string) {
    try {
        await prisma.subProduct.delete({
            where: { id },
        });
        revalidatePath('/');
        revalidatePath(`/admin/brands/${brandId}`);
        return { success: true };
    } catch (error) {
        console.error('Failed to delete sub product:', error);
        return { success: false, error: 'Failed to delete sub product' };
    }
}

export async function updateSubProduct(id: string, brandId: string, formData: FormData) {
    const name = formData.get('name');
    const shortDescription = formData.get('shortDescription');
    const longDescription = formData.get('longDescription');
    const image = formData.get('image');
    const currentImage = formData.get('currentImage');
    const price = formData.get('price');
    const whatsapp = formData.get('whatsapp');
    const galleryImages = formData.get('galleryImages');

    let imagePath = currentImage as string;

    if (image instanceof File && image.size > 0) {
        try {
            const buffer = Buffer.from(await image.arrayBuffer());
            const filename = `${Date.now()}-${image.name.replace(/\s+/g, '-')}`;
            const uploadDir = join(cwd(), 'public', 'uploads');
            await writeFile(join(uploadDir, filename), buffer);
            imagePath = `/uploads/${filename}`;
        } catch (error) {
            console.error('Error uploading file:', error);
            return { success: false, error: 'Failed to upload image' };
        }
    }

    const rawData = {
        name,
        shortDescription,
        longDescription,
        image: imagePath,
        price,
        whatsapp,
        brandProductId: brandId, // Reusing schema validation
        galleryImages,
    };

    const validatedData = SubProductSchema.safeParse(rawData);

    if (!validatedData.success) {
        return { success: false, error: validatedData.error.flatten().fieldErrors };
    }

    try {
        let parsedShortDesc = [];
        try {
            parsedShortDesc = JSON.parse(validatedData.data.shortDescription);
        } catch (e) {
            parsedShortDesc = [validatedData.data.shortDescription];
        }

        let parsedGalleryImages = [];
        try {
            if (validatedData.data.galleryImages) {
                parsedGalleryImages = JSON.parse(validatedData.data.galleryImages);
            }
        } catch (e) {
            parsedGalleryImages = [];
        }

        await prisma.subProduct.update({
            where: { id },
            data: {
                name: validatedData.data.name,
                image: validatedData.data.image,
                shortDescription: parsedShortDesc,
                longDescription: validatedData.data.longDescription,
                price: validatedData.data.price,
                whatsapp: validatedData.data.whatsapp || null,
                galleryImages: parsedGalleryImages,
            },
        });
        revalidatePath('/');
        revalidatePath(`/admin/brands/${brandId}`);
        revalidatePath(`/products/${id}`);
        redirect(`/admin/brands/${brandId}`);
    } catch (error) {
        console.error('Failed to update sub product:', error);
        return { success: false, error: 'Failed to update sub product' };
    }
}



export async function updatePage(id: string, formData: FormData) {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const published = formData.get('published') === 'on';

    const sectionsData = formData.get('sectionsData') as string;
    let sections = [];
    try {
        sections = JSON.parse(sectionsData);
    } catch {
        // ignore
    }

    await prisma.$transaction(async (tx: any) => {
        // Update basic page info
        await tx.page.update({
            where: { id },
            data: {
                title,
                slug,
                published,
            },
        });

        // Sync sections: Delete all and re-create (simplest strategy for re-ordering)
        // In a high-traffic app we might be more surgical, but for CMS this is fine.
        await tx.section.deleteMany({
            where: { pageId: id }
        });

        // Insert new sections
        if (sections.length > 0) {
            await tx.section.createMany({
                data: sections.map((s: any, index: number) => ({
                    id: crypto.randomUUID(),
                    pageId: id,
                    type: s.type,
                    content: typeof s.content === 'string' ? s.content : JSON.stringify(s.content),
                    order: index,
                    updatedAt: new Date()
                }))
            });
        }
    });

    revalidatePath('/admin/pages');
    revalidatePath(`/admin/pages/${id}`);
    redirect('/admin/pages');
}



export async function uploadImage(formData: FormData) {
    const file = formData.get('file') as File;
    if (!file) {
        throw new Error('No file uploaded');
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = uniqueSuffix + '-' + file.name.replace(/\s+/g, '-');
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const filepath = join(uploadDir, filename);
    const publicUrl = `/uploads/${filename}`;

    try {
        // Ensure the uploads directory exists (important on first run / fresh deployment)
        await mkdir(uploadDir, { recursive: true });
        await writeFile(filepath, buffer);

        // Save to DB
        await prisma.asset.create({
            data: {
                id: crypto.randomUUID(),
                filename: file.name,
                url: publicUrl,
                mimeType: file.type,
                size: file.size
            }
        });

        revalidatePath('/admin/media');
        return { success: true };
    } catch (error) {
        console.error('Upload error:', error);
        return { success: false, error: 'Upload failed' };
    }
}

export async function updateSettings(formData: FormData) {
    const settings = [
        'site_name',
        'contact_email',
        'phone',
        'address',
        'notification_email',
        'social_twitter',
        'social_linkedin',
        'social_github',
        'social_discord'
    ];

    try {
        await prisma.$transaction(
            settings.map((key: string) => {
                const value = formData.get(key) as string;
                return prisma.setting.upsert({
                    where: { key },
                    update: { value, updatedAt: new Date() },
                    create: { key, value, updatedAt: new Date() },
                });
            })
        );
        revalidatePath('/admin/settings');
        revalidatePath('/contact');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Failed to update settings:', error);
        return { success: false, error: 'Failed to update settings' };
    }
}

const InquirySchema = z.object({
    requirement: z.string().min(1, "Requirement is required"),
    name: z.string().min(1, "Name is required"),
    mobile: z.string().min(1, "Mobile number is required"),
    email: z.string().email().optional().or(z.literal('')),
});

export async function submitInquiry(formData: FormData) {
    const strugglesJson = formData.get('struggles') as string;
    let struggles = [];
    try {
        if (strugglesJson) struggles = JSON.parse(strugglesJson);
    } catch {
        // ignore
    }

    const rawData = {
        requirement: formData.get('requirement'),
        name: formData.get('name'),
        mobile: formData.get('mobile'),
        email: formData.get('email'),
    };

    const validatedFields = InquirySchema.safeParse(rawData);

    if (!validatedFields.success) {
        return { success: false, errors: validatedFields.error.flatten().fieldErrors };
    }

    try {
        const { requirement, name, mobile, email } = validatedFields.data;

        // Append struggles to requirement for DB storage (avoids DB schema change)
        let finalRequirement = requirement;
        if (struggles.length > 0) {
            finalRequirement += `\n\n[Main Struggles: ${struggles.join(', ')}]`;
        }

        await prisma.inquiry.create({
            data: {
                requirement: finalRequirement,
                name,
                mobile,
                email: email || null,
            },
        });

        // Send Email Notification
        const adminEmail = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER || 'admin@example.com';

        const strugglesHtml = struggles.length > 0
            ? `<p><strong>Main Struggles:</strong> ${struggles.join(', ')}</p>`
            : '';

        await sendEmail({
            to: adminEmail,
            subject: 'New Inquiry from Panoralink Website',
            text: `Name: ${name}\nMobile: ${mobile}\nEmail: ${email}\n\nMain Struggles: ${struggles.join(', ')}\n\nRequirement:\n${requirement}`,
            html: `
                <h2>New Inquiry</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Mobile:</strong> ${mobile}</p>
                <p><strong>Email:</strong> ${email || 'N/A'}</p>
                ${strugglesHtml}
                <h3>Requirement:</h3>
                <p>${requirement.replace(/\n/g, '<br>')}</p>
            `,
        });

        revalidatePath('/admin/inquiries');
        return { success: true };
    } catch (error) {
        console.error('Failed to submit inquiry:', error);
        return { success: false, error: 'Failed to submit inquiry. Please try again.' };
    }
}

// Contact Form Action
const ContactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function submitContactMessage(formData: FormData) {
    const rawData = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
    };

    const validatedFields = ContactSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return { success: false, errors: validatedFields.error.flatten().fieldErrors };
    }

    const { name, email, subject, message } = validatedFields.data;

    try {
        // Send Email
        const contactEmail = 'support@panoralink.com'; // Hardcoded as per request, or fall back to env if preferred

        await sendEmail({
            to: contactEmail,
            subject: `Contact Form: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <h2>New Contact Message</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <h3>Message:</h3>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        });

        // Optional: Send auto-reply to user? (Not requested, skipping for now)

        return { success: true };
    } catch (error) {
        console.error('Failed to submit contact message:', error);
        return { success: false, error: 'Failed to send message. Please try again later.' };
    }
}

// Review Actions
const ReviewSchema = z.object({
    name: z.string().min(1, "Name is required"),
    rating: z.string().transform((val) => parseInt(val, 10)).pipe(z.number().min(1).max(5)),
    comment: z.string().min(5, "Comment must be at least 5 characters"),
    designation: z.string().optional(),
    image: z.string().optional(),
});

export async function submitReview(formData: FormData) {
    const name = formData.get('name');
    const rating = formData.get('rating');
    const comment = formData.get('comment');
    const designation = formData.get('designation');
    const image = formData.get('image');

    let imagePath = '';

    if (image instanceof File && image.size > 0) {
        try {
            const buffer = Buffer.from(await image.arrayBuffer());
            const filename = `${Date.now()}-${image.name.replace(/\s+/g, '-')}`;
            const uploadDir = join(cwd(), 'public', 'uploads');
            await writeFile(join(uploadDir, filename), buffer);
            imagePath = `/uploads/${filename}`;
        } catch (error) {
            console.error('Error uploading file:', error);
            return { success: false, error: 'Failed to upload image' };
        }
    }

    const rawData = {
        name,
        rating,
        comment,
        designation,
        image: imagePath,
    };

    const validatedData = ReviewSchema.safeParse(rawData);

    if (!validatedData.success) {
        return { success: false, error: validatedData.error.flatten().fieldErrors };
    }

    try {
        await prisma.review.create({
            data: {
                name: validatedData.data.name,
                rating: validatedData.data.rating,
                comment: validatedData.data.comment,
                designation: validatedData.data.designation || null,
                image: validatedData.data.image || null,
                isApproved: false, // Default to pending
            },
        });

        // Optional: Send email notification to admin about new review
        const adminEmail = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER || 'admin@example.com';
        await sendEmail({
            to: adminEmail,
            subject: 'New Review Submitted',
            text: `A new review has been submitted by ${validatedData.data.name}. Log in to admin panel to approve it.`,
            html: `<p>A new review has been submitted by <strong>${validatedData.data.name}</strong>.</p><p>Rating: ${validatedData.data.rating}/5</p><p>Comment: ${validatedData.data.comment}</p><p><a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/reviews">Go to Admin Panel</a></p>`
        }).catch(err => console.error("Failed to send review notification email", err));

        revalidatePath('/admin/reviews');
        return { success: true };
    } catch (error) {
        console.error('Failed to submit review:', error);
        return { success: false, error: 'Failed to submit review' };
    }
}

export async function toggleReviewApproval(id: string) {
    try {
        const review = await prisma.review.findUnique({ where: { id } });
        if (!review) return { success: false, error: 'Review not found' };

        await prisma.review.update({
            where: { id },
            data: { isApproved: !review.isApproved },
        });
        revalidatePath('/');
        revalidatePath('/admin/reviews');
        return { success: true };
    } catch (error) {
        console.error('Failed to toggle review approval:', error);
        return { success: false, error: 'Failed to update review' };
    }
}

export async function deleteReview(id: string) {
    try {
        await prisma.review.delete({
            where: { id },
        });
        revalidatePath('/');
        revalidatePath('/admin/reviews');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete review:', error);
        return { success: false, error: 'Failed to delete review' };
    }
}

export async function updateReview(id: string, formData: FormData) {
    const name = formData.get('name');
    const rating = formData.get('rating');
    const comment = formData.get('comment');
    const designation = formData.get('designation');
    // Image update not strictly required for admin edit, but can be added if needed. 
    // Usually admin just moderates text/approval.

    const rawData = {
        name,
        rating,
        comment,
        designation,
        // image: ... if we want to allow admin to change user image
    };

    // Loose validation for update
    const schema = z.object({
        name: z.string().min(1),
        rating: z.string().transform((val) => parseInt(val, 10)).pipe(z.number().min(1).max(5)),
        comment: z.string().min(1),
        designation: z.string().optional(),
    });

    const validated = schema.safeParse(rawData);
    if (!validated.success) return { success: false, error: validated.error.flatten().fieldErrors };

    try {
        await prisma.review.update({
            where: { id },
            data: {
                name: validated.data.name,
                rating: validated.data.rating,
                comment: validated.data.comment,
                designation: validated.data.designation || null,
            }
        });
        revalidatePath('/');
        revalidatePath('/admin/reviews');
        return { success: true };
    } catch (error) {
        console.error('Failed to update review:', error);
        return { success: false, error: 'Failed to update review' };
    }
}
