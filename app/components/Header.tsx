// 'use client';

type HeaderProps = {
  title: any;
  value: any;
  subvalue?: any;
  size: 'small' | 'medium' | 'large';
  colorClassName?: any;
  fixedWidth?: boolean;
}

export default function Header({title, value, size = 'small', colorClassName, subvalue, fixedWidth}: HeaderProps) {
  switch(size) {
    case 'small': {
      return (
        <div className="flex flex-row mt-2 py-2 border-2 border-sage2 rounded-xl">
          <span className="text-md pl-4 text-gray-100 font-bold select-none">
            {title}
          </span>
            <span className="text-md pr-4 text-gray-100 font-semibold pl-2">
            {value}
          </span>
        </div>
      );
    }
    case 'medium': {
      return (
        <div className="min-w-4xl border-2 border-black2 rounded-lg p-4 mb-16">
          <h3 className="flex px-4 text-sage2 text-align-left font-semibold text-2xl items-center justify-center select-none">
            Step {title}
          </h3>
          <div className="flex flex-col px-4 justify-center items-center select-none pt-2">
            <span className="text-gray-100 text-align-center font-bold text-lg">{value}</span>
            <hr className="border-black2 border-[0.75px] rounded-lg w-full mt-4" />
            <span className="text-gray-100 text-align-center font-normal text-lg pt-4">{subvalue}</span>
          </div>
        </div>
      );
    }
    case 'large': {
      return (
        <div className={`flex flex-col pt-2 pb-1.5 px-4 ${fixedWidth ? 'w-[300px]': 'w-fit'} h-fit border-2 border-${colorClassName} rounded-lg hover:shadow-md duration-500 group bg-${colorClassName} items-center justify-center`}>
          <h3 className={`text-${colorClassName} font-bold ${fixedWidth ? 'text-3xl': 'text-4xl'} text-center flex-grow flex items-center justify-center select-none text-gray-100`}>
            {title}
          </h3>
        </div>
      );      
    }
  }
};