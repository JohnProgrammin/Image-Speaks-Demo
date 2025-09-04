import React, { useState, useEffect } from 'react';
import { 
  StarIcon,
  UserIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  serverTimestamp,
  orderBy,
  limit 
} from 'firebase/firestore';
import { db } from '../firebase';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [submissionCount, setSubmissionCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const submittedEmail = localStorage.getItem('review_submitted_email');
    const count = localStorage.getItem('review_submission_count');
    if (submittedEmail) {
      setEmail(submittedEmail);
      setSubmissionCount(parseInt(count) || 0);
    }
  }, []);

  // Fetch reviews from Firebase with error handling
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching reviews from Firebase...');
        
        const q = query(
          collection(db, 'reviews'),
          orderBy('createdAt', 'desc'),
          limit(50)
        );
        const querySnapshot = await getDocs(q);
        
        console.log('Total documents found:', querySnapshot.size);
        
        const reviewsData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log('Review data:', { id: doc.id, ...data });
          if (data.approved) {
            reviewsData.push({ id: doc.id, ...data });
          }
        });
        
        console.log('Approved reviews:', reviewsData.length);
        setReviews(reviewsData);
        
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to load reviews. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Modified to return review count for the thank you message
  const getEmailReviewCount = async (email) => {
    try {
      const q = query(
        collection(db, 'reviews'), 
        where('email', '==', email.toLowerCase())
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.size;
    } catch (error) {
      console.error('Error checking email:', error);
      return 0;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    setError(null);

    if (!name.trim() || !email.trim() || !comment.trim()) {
      setSubmitStatus('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    try {
      // Add new review to Firestore
      const reviewData = {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        rating,
        comment: comment.trim(),
        createdAt: serverTimestamp(),
        approved: true
      };
      
      console.log('Submitting review:', reviewData);
      
      const docRef = await addDoc(collection(db, 'reviews'), reviewData);
      console.log('Review submitted with ID:', docRef.id);

      // Update local storage and state with submission count
      const existingCount = await getEmailReviewCount(email);
      const newCount = existingCount + 1;
      localStorage.setItem('review_submitted_email', email.toLowerCase().trim());
      localStorage.setItem('review_submission_count', newCount.toString());
      setSubmissionCount(newCount);
      
      setSubmitStatus(`Thank you for your review!`);
      setName('');
      setComment('');
      setRating(5);

      // Refresh reviews
      const q = query(
        collection(db, 'reviews'),
        orderBy('createdAt', 'desc'),
        limit(50)
      );
      const querySnapshot = await getDocs(q);
      const reviewsData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.approved) {
          reviewsData.push({ id: doc.id, ...data });
        }
      });
      setReviews(reviewsData);
      
    } catch (error) {
      console.error('Error adding review:', error);
      setError('There was an error submitting your review. Please try again.');
      setSubmitStatus('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <StarIcon
        key={index}
        className={`w-5 h-5 ${
          index < rating 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Recently';
    try {
      const date = timestamp.toDate();
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Recently';
    }
  };

  // Test function to check Firebase connection
  const testFirebaseConnection = async () => {
    try {
      console.log('Testing Firebase connection...');
      const testQuery = query(collection(db, 'reviews'), limit(1));
      const snapshot = await getDocs(testQuery);
      console.log('Firebase connection successful. Documents:', snapshot.size);
      return true;
    } catch (error) {
      console.error('Firebase connection failed:', error);
      setError('Cannot connect to database. Please check your Firebase configuration.');
      return false;
    }
  };

  if (error) {
    return (
      <section className="min-h-screen pt-20 bg-white py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ExclamationTriangleIcon className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Connection Error
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={testFirebaseConnection}
            className="bg-blue-600 text-white px-6 py-2 hover:bg-blue-700 transition-colors"
          >
            Test Connection
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-20 bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 border-b border-gray-200 pb-8">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            Customer Reviews
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See what our clients have to say about their experience with us
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Review Form - ALWAYS VISIBLE */}
          <div className="bg-white p-6 border border-gray-200">
            <h3 className="text-xl font-medium text-gray-900 mb-6">
              Share Your Experience
            </h3>
            
            {/* Success Message (if submitted) */}
            {submissionCount > 0 && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200">
                <div className="flex items-center">
                  <StarIcon className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-700">
                    Thank you for your {submissionCount} review{submissionCount > 1 ? 's' : ''}!
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Rating
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <StarIcon
                        className={`w-6 h-6 ${
                          star <= rating 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-300'
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  required
                  rows="4"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Share your experience..."
                />
              </div>

              {submitStatus && (
                <div className={`p-3 ${
                  submitStatus.includes('Thank you') 
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {submitStatus}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 px-4 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>

          {/* Reviews List */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-medium text-gray-900">
                Customer Feedback ({reviews.length})
              </h3>
              {loading && (
                <div className="text-sm text-gray-500">
                  Loading...
                </div>
              )}
            </div>
            
            {reviews.length === 0 ? (
              <div className="text-center py-12 bg-white border border-gray-200">
                <UserIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  {loading ? 'Loading reviews...' : 'No reviews yet. Be the first to share your experience!'}
                </p>
              </div>
            ) : (
              <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{review.name}</h4>
                        <div className="flex items-center mt-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        {formatDate(review.createdAt)}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;