'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Star } from 'lucide-react';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function ReviewForm({ productId }) {
    const { data: session } = useSession();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!rating) return toast.error("Please select a star rating");
        if (!comment.trim()) return toast.error("Please enter a comment");

        setIsSubmitting(true);

        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId, rating, comment })
            });

            if (res.ok) {
                toast.success("Review submitted successfully!");
                setRating(0);
                setComment("");

                // Hard reload to show updated reviews and new avg rating
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to submit review");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!session) {
        return (
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center">
                <p className="text-gray-600">Please log in to leave a review.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white border text-black border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900">Write a Review</h3>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="focus:outline-none transition-transform hover:scale-110"
                        >
                            <Star
                                size={28}
                                className={`${(hoverRating || rating) >= star
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-gray-300"
                                    }`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                <textarea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="What did you think about this product?"
                    className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#008DFF]"
                />
            </div>

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
        </form>
    );
}
