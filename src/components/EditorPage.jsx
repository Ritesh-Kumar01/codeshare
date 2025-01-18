import React, { useEffect, useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../firebase';
import { FaCopy, FaUserFriends, FaCheck } from 'react-icons/fa';

const EditorPage = ({ username }) => {
  const [code, setCode] = useState('// Start coding here...');
  const [users, setUsers] = useState([]);
  const [copying, setCopying] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    // Connect to Firebase
    const codeRef = ref(db, 'code');
    const usersRef = ref(db, 'users');

    // Listen for code changes
    const codeUnsubscribe = onValue(codeRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.content) {
        setCode(data.content);
      }
    });

    // Listen for user changes
    const usersUnsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUsers(Object.values(data));
      }
    });

    // Add user to Firebase
    const userRef = ref(db, `users/${username}`);
    set(userRef, { name: username, lastActive: Date.now() });

    // Cleanup function
    return () => {
      codeUnsubscribe();
      usersUnsubscribe();
      set(userRef, null);
    };
  }, [username]);

  const handleEditorChange = (value) => {
    if (value !== undefined) {
      setCode(value);
      // Update code in Firebase
      set(ref(db, 'code'), {
        content: value,
        lastModifiedBy: username,
        timestamp: Date.now()
      });
    }
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const copyCode = async () => {
    if (editorRef.current) {
      const value = editorRef.current.getValue();
      try {
        await navigator.clipboard.writeText(value);
        setCopying(true);
        setTimeout(() => setCopying(false), 2000); // Reset after 2 seconds
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            Welcome, {username}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-300">
              <FaUserFriends className="mr-2" />
              <span>{users.length} users online</span>
            </div>
            {/* <button
              onClick={copyCode}
              disabled={copying}
              className={`flex items-center px-4 py-2 rounded-lg text-white transition-all duration-300 transform
                ${copying 
                  ? 'bg-green-600 hover:bg-green-700 scale-105' 
                  : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
                } active:scale-95`}
            >
              {copying ? (
                <>
                  <FaCheck className="mr-2 animate-bounce" />
                  Copied!
                </>
              ) : (
                <>
                  <FaCopy className="mr-2" />
                  Copy Code
                </>
              )}
            </button> */}

<button
  onClick={copyCode}
  disabled={copying}
  className={`flex items-center px-4 py-2 rounded-lg text-white 
    transition-all duration-300 ease-in-out transform relative
    overflow-hidden shadow-lg hover:shadow-xl
    ${copying 
      ? 'bg-green-600 hover:bg-green-700' 
      : 'bg-blue-600 hover:bg-blue-700'
    }
    hover:-translate-y-1 hover:scale-105
    active:translate-y-0 active:scale-95
    disabled:opacity-75 disabled:cursor-default
    before:absolute before:top-0 before:left-0 before:w-full before:h-full
    before:bg-white before:opacity-0 before:transition-opacity
    hover:before:opacity-10
  `}
>
  <div className={`flex items-center justify-center w-full
    ${copying ? 'animate-[slideUp_0.3s_ease-in-out]' : 'animate-[slideDown_0.3s_ease-in-out]'}`}
  >
    {copying ? (
      <>
        <FaCheck className="mr-2 animate-[spin_0.5s_ease-out]" />
        <span className="animate-[fadeIn_0.3s_ease-in-out]">Copied!</span>
      </>
    ) : (
      <>
        <FaCopy className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
        <span>Copy Code</span>
      </>
    )}
  </div>
</button>


          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="rounded-lg overflow-hidden border border-gray-700">
          <Editor
            height="80vh"
            defaultLanguage="cpp"
            theme="vs-dark"
            value={code}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            options={{
              fontSize: 20,
              minimap: { enabled: true },
              scrollbar: {
                vertical: 'visible',
                horizontal: 'visible'
              },
              automaticLayout: true,
              padding: { top: 16 }
            }}
            loading={<div className="text-white p-4">Loading editor...</div>}
          />
        </div>
      </main>
    </div>
  );
};

export default EditorPage;