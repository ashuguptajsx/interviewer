import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { dummyInterviews } from '@/constants';
import InterviewCard from '@/components/InterviewCard';

const Page = () => {
  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>Become ready for the interview with AI</h2>
          <p className='text-lg'>Practice on real interview questions and get instant feedback</p>
          <Button asChild className='btn-primary max-sm:w-full'>
            <Link href="/interview">Start the interview</Link>
          </Button>
        </div>
        <Image src="/robot.png" alt="hero" width={500} height={500} className='max-sm:hidden' />
      </section>
      <section className='flex flex-col gap-6 mt-8'>
        <h2>your interviews</h2>
        <div className='interviews-section'>
          {dummyInterviews.length > 0 ? (
            dummyInterviews.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>You haven’t created any interviews yet.</p>
          )}
        </div>
      </section>
      <section className='flex flex-col gap-6 mt-8'>
        <h2>Take an interview</h2>
        <div className='interviews-section'>
          {dummyInterviews.length > 0 ? (
            dummyInterviews.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>You haven’t taken any interviews yet.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;