import React, { useEffect, useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../firebase';
import { FaCopy, FaUserFriends } from 'react-icons/fa';

const EditorPage = ({ username }) => {
  const [code, setCode] = useState('// Start coding here...');
  const [users, setUsers] = useState([]);
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

  const copyCode = () => {
    if (editorRef.current) {
      const value = editorRef.current.getValue();
      navigator.clipboard.writeText(value);
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
            <button
              onClick={copyCode}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 
                       rounded-lg text-white transition-colors"
            >
              <FaCopy className="mr-2" /> Copy Code
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