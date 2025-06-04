import React from 'react';
import { Users, BrainCircuit, Clock, Dumbbell, Coffee, Heart, MessagesSquare, Cloud } from 'lucide-react';

export const statisticsData = [
  {
    title: "of adults worldwide experience social anxiety disorder",
    value: "7%",
    description: "Social anxiety disorder is one of the most common mental health conditions, affecting millions of people around the world regardless of age, gender, or background.",
    source: "National Institute of Mental Health",
    icon: <Users size={64} className="text-primary-600" />,
  },
  {
    title: "average delay in seeking treatment after symptoms begin",
    value: "10 years",
    description: "Despite its prevalence, many people wait a decade or more before seeking help for social anxiety, often due to the stigma or not recognizing their symptoms as treatable.",
    source: "Anxiety and Depression Association of America",
    icon: <Clock size={64} className="text-primary-600" />,
  },
  {
    title: "improvement in symptoms with regular exercise",
    value: "40%",
    description: "Regular physical activity can significantly reduce social anxiety symptoms by releasing endorphins, improving sleep quality, and enhancing overall mood regulation.",
    source: "Journal of Psychiatric Research",
    icon: <Dumbbell size={64} className="text-primary-600" />,
  },
  {
    title: "of social anxiety cases linked to lifestyle factors",
    value: "65%",
    description: "Research suggests that while genetics play a role, lifestyle factors like sleep quality, nutrition, exercise, and social habits significantly influence social anxiety levels.",
    source: "Journal of Anxiety Disorders",
    icon: <BrainCircuit size={64} className="text-primary-600" />,
  },
  {
    title: "increased risk with high caffeine consumption",
    value: "2.5x",
    description: "Studies show that high caffeine intake can exacerbate anxiety symptoms in susceptible individuals by triggering the body's 'fight or flight' response.",
    source: "Journal of Psychopharmacology",
    icon: <Coffee size={64} className="text-primary-600" />,
  },
  {
    title: "success rate with cognitive behavioral therapy",
    value: "75%",
    description: "Cognitive Behavioral Therapy (CBT) is highly effective for social anxiety, helping people identify and change negative thought patterns and gradually face feared situations.",
    source: "American Psychological Association",
    icon: <Cloud size={64} className="text-primary-600" />,
  },
  {
    title: "reduction in symptoms with regular social exposure",
    value: "60%",
    description: "Gradual, consistent exposure to social situations can significantly reduce anxiety through a process called habituation, where the brain learns that these situations aren't threatening.",
    source: "Behaviour Research and Therapy",
    icon: <MessagesSquare size={64} className="text-primary-600" />,
  },
  {
    title: "of people with social anxiety also experience depression",
    value: "70%",
    description: "Social anxiety frequently co-occurs with depression, highlighting the importance of comprehensive approaches to mental health that address multiple conditions.",
    source: "Journal of Clinical Psychiatry",
    icon: <Heart size={64} className="text-primary-600" />,
  },
];