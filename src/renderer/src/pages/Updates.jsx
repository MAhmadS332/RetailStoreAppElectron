import React, { useEffect, useState } from 'react';

const Updates = () => {
  const [status, setStatus] = useState('Checking for updates...');
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    // // Listen to update messages from Electron main process
    // if (window.electron) {
    //   window.electron.ipcRenderer.on('update-status', (_, message) => {
    //     setStatus(message);
    //   });

    //   window.electron.ipcRenderer.on('update-progress', (_, percent) => {
    //     setProgress(percent.toFixed(0));
    //   });

    //   // Request update check
    //   window.electron.ipcRenderer.send('check-for-updates');
    // }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">App Updates</h1>
        <p className="text-gray-700 mb-4">{status}</p>

        {progress !== null && (
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-blue-500 h-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Updates;
