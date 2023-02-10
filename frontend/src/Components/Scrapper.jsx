import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

function Scraper() {
    const [data, setData] = useState([]);
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch(data.url);
            const html = await response.text();
            setData(html);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
      if (data.url) {
        onSubmit(data)
      }
    }, [data])

    return (
        <div className="bg-gray-200 p-4 flex flex-col items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-lg font-medium mb-2">Web Scraper</h1>
                <input type="url" name="url" placeholder="Enter URL"  className="mb-4 p-2 rounded-lg border border-gray-400" />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Submit</button>
            </form>
            <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                <pre>{data}</pre>
            </div>
        </div>
    );
}

export default Scraper;