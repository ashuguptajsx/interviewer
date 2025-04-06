import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { dummyInterviews } from '@/constants';
import InterviewCard from '@/components/InterviewCard';
import { getCurrentUser } from '@/lib/actions/auth.actions';
import { getInterviewByUserId } from '@/lib/actions/auth.actions';

const Page = async () => {
  const user = await getCurrentUser();
  const userInterviews = await getInterviewByUserId(user?.id!);

  const hasPastInterviews = userInterviews?.length > 0;
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
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview?.id} />
            ))
          ) : 
         
            <p>You haven’t created any interviews yet.</p>
        }
        </div>
      </section>
    </>
  );
};

export default Page;