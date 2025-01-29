"use client"

import { useEffect, useState } from 'react';
import Header from "./components/Header";
import Substep from "./components/substep";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RefreshCcw } from 'lucide-react';

export default function Home() {
  const [project, setProject] = useState<any>({});
  const [steps, setSteps] = useState<Step[]>([]);
  const [frames, setFrames] = useState<Frame[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  type Frame = {
    id: string;
    title: string;
    tools: string[];
    action: string;
    raw_img: string;
  };

  type Step = {
    id: string;
    title: string;
    progression: string;
    substeps: string[];
  }

  const handleCreateProject = async (values: any) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/create_project`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const response = await res.json();
      console.log(response);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
      window.location.reload();
    };
  }

  const getProject = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/get_project`);
      const response = await res.json();
      if (response && response.length > 0) {
        const projectData = response[0];
        setProject(projectData);

      } else {
        console.log("No project data found");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    };
  }

  const getSteps = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/get_steps`);
      const response = await res.json();
      if (response && response.length > 0) {
        const stepsData = response.map((step: any) => ({
          ...step,
        }));

        setSteps(stepsData);

      } else {
        console.log("No project data found");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    };
  }

  const getFrames = async () => {
    try {
      setIsLoading(true);
      const substeps = steps.flatMap(step => step.substeps);
      if (substeps.length === 0) {
        console.log("No substeps found");
        return;
      }
      const queryString = `frameIds=${encodeURIComponent(JSON.stringify(substeps))}`;
      
      const res = await fetch(`/api/get_frames?${queryString}`);
      const response = await res.json();
      if (response && response.length > 0) {
        const framesData = response.map((frame: any) => ({
          ...frame,
        }));

        setFrames(framesData);

      } else {
        console.log("No frame data found");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProject();
    getSteps();
  }, []);

  useEffect(() => {
    if (steps.length > 0) {
      getFrames();
    }
  }, [steps]);

  const handleRefresh = () => {
    window.location.reload();
  };  

  const getFramesForStep = (step: Step) => {
    return frames.filter(frame => step.substeps.includes(frame.id));
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  });

  return (
    
    <div className="flex flex-col justify-start items-start bg-black1 h-dvh p-12 w-full overflow-x-auto space-y-12">
      <nav className="w-full flex justify-between items-center px-8 bg-black1 text-gray-100">
        <div className="text-xl font-bold hover:text-sage2 duration-300 cursor-pointer">Home</div>
        <div className="flex space-x-8">
          <div className="text-xl font-bold hover:text-sage2 duration-300 cursor-pointer">Guides</div>
          <div className="text-xl font-bold hover:text-sage2 duration-300 cursor-pointer">Create</div>
        </div>
      </nav>

      {!project.title || isLoading ? (
        <Formik
          initialValues={{ title: '', description: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleCreateProject(values);
            setSubmitting(false);
          }}
        >
        {({ isSubmitting }) => (
          <Form className="flex flex-col items-center justify-center space-y-4 w-full">
            <div className="w-2/5">
              <h3 className="text-xl font-bold uppercase text-gray-100 pl-1 mt-6">Create Project</h3>
              <Field type="text" name="title" className="mt-6 p-2 w-full rounded-lg bg-black1 border-2 border-black2 font-semibold text-gray-100 focus:border-sage2 focus:ring-0" placeholder="Title" />
              <ErrorMessage name="title" component="div" className="mt-1 font-semibold text-red-500" />
              <Field type="text" name="description" className="mt-6 p-2 w-full rounded-lg bg-black1 border-2 border-black2 font-semibold text-gray-100 focus:border-sage2 focus:ring-0" placeholder="Description" />
              <ErrorMessage name="description" component="div" className="mt-1 font-semibold text-red-500" />
              <button type="submit" disabled={isSubmitting} className="w-[15dvw] bg-black1 border-2 border-black2 text-gray-100 font-bold p-2 mt-8 rounded-lg hover:bg-black2 hover:scale-105 duration-300">
                Submit
              </button>
            </div>
            
          </Form>
        )}
        </Formik>
      ) : (
      <div className="flex flex-col justify-start items-center w-full">
        <button 
          onClick={handleRefresh}
          className="fixed bottom-10 right-10 p-3 bg-black2 hover:bg-sage1 rounded-full shadow-lg hover:scale-110 duration-300 z-50"
        >
          <RefreshCcw className="w-6 h-6 text-gray-100" />
        </button>

        <h1 className="text-5xl font-bold uppercase text-gray-100 mt-4 mb-16">{project.title}</h1>
      
        <div className="w-full space-y-16">
          {steps?.map((step: Step, index: number) => {
            const stepFrames = getFramesForStep(step);

            return (
              <div key={step.id} className="flex flex-col items-center w-full my-4">
                
                <Header 
                  title={index + 1} 
                  value={step.title} 
                  subvalue={step.progression} 
                  size="medium" 
                />
                
                <div className="flex flex-row flex-wrap gap-4 justify-center w-full px-4 mb-16">
                  {stepFrames.map((frame: Frame, frameIndex: number) => (
                    <div key={`${step.id}-${frame.id}`} className="flex flex-row">
                      <Substep
                        value={`${index + 1}.${frameIndex + 1}`}
                        tools={frame.tools}
                        desc={frame.action}
                        image={frame.raw_img}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      )}
    </div>
  );
}