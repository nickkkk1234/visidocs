"use client"

import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import Header from "./Header";
import { Key, useEffect, useState } from "react";

export default function Substep(props: {value: any, image: any, tools: any, desc: any}) {
  const [description, setDescription] = useState<string[]>([]);

  useEffect(() => {
    if (props.desc) {
      const items = props.desc.split('* ').filter((item: string) => item.trim() !== '');
      setDescription(items);
    }
  }, [props.desc]);

  const formatTools = (tools: string[]) => {
    return tools
      .map(tool => tool.charAt(0).toUpperCase() + tool.slice(1).toLowerCase())
      .join(", ");
  };

  const getImageSrc = (base64String: string) => {
    if (!base64String) return "";
    if (!base64String.startsWith('data:image')) {
      return `data:image/jpeg;base64,${base64String}`;
    }
    return base64String;
  };

  const accordionValue = `step-${props.value}`;

  return (
    <Accordion className="min-w-md max-w-md" type="single" collapsible>
        <AccordionItem value={accordionValue} className="border-2 border-black2 rounded-lg data-[state=open]:bg-black1 hover:bg-black2 transition-all duration-300">
          <AccordionTrigger className="duration-300">
            <b>Step <span>{props.value}</span></b>
          </AccordionTrigger>
          <AccordionContent className="overflow-auto pr-4 ">
          <div className="flex flex-col space-y-4">
            <Header title="Tools: " value={formatTools(props.tools)} size="small" colorClassName="accent1" />
            <h3 className="text-2xl font-semibold text-center text-gray-100 pt-4">Action Items</h3>
            <div className="border-sage2 border-[0.75px] rounded-lg" /> 
              <div className="flex pt-4">
                <div className="w-1/3 rounded-lg">
                  <Image className="rounded-lg" src={getImageSrc(props.image)} alt="Description 1" width={100} height={100} layout="responsive" />
                </div>
                <div className="w-2/3 pl-4 flex items-center">
                  <ul className="list-disc pl-5 space-y-1">
                    {description.map((item: string, index: Key) => (
                      <li key={index} className="text-md text-gray-100 font-normal">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
    );
}

