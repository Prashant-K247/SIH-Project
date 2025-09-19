import React,{useState} from "react";

function Community() {
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    setJoined(!joined);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black flex flex-col">
      {/* Header */}
      <div className="bg-gray-100 border-b border-gray-700 flex items-center px-8 py-6">
        <div className="rounded-full bg-pink-400 flex items-center justify-center h-16 w-16 mr-6">
          {/* Logo */}
          <svg viewBox="0 0 20 20" fill="none" className="h-10 w-10 text-black"><path d="M10 1.9a8.1 8.1 0 100 16.2 8.1 8.1 0 000-16.2zm0 1.5a6.6 6.6 0 110 13.2 6.6 6.6 0 010-13.2zm-1.5 3.6c-.2-.5-.9-.3-.9.2v6.2c0 .5.7.7.9.2l1.5-3.2c.2-.5.7-.5.9 0l1.5 3.2c.2.5.9.3.9-.2V7.2c0-.5-.7-.7-.9-.2L10 10.4 8.5 7z" fill="currentColor"/></svg>
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-1">Anxietyhelp</h1>
          <div className="flex items-center gap-3">
            <button
            onClick={handleJoin}
            className="bg-blue-600 hover:bg-blue-700 text-black rounded px-4 py-1 font-semibold">
            {joined ? 'Joined' : 'Join'}
            </button>
            <button className="border border-gray-600 text-black rounded px-4 py-1 font-semibold">Create Post</button>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="flex flex-1 px-4 py-8 gap-8">

        {/* Left Section */}
        <div className="flex-1">

          {/* Post 1*/}
          <div className="bg-gray-100 rounded-lg p-6 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-purple-400 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-900">u</span>
              </div>
              <span className="text-xs text-gray-800 font-semibold">MrEnd254</span>
              <span className="text-xs text-gray-800">2 hr. ago</span>
              <span className="bg-gray-800 text-xs px-2 py-1 rounded font-bold text-gray-300 ml-2">Giving Advice</span>
            </div>
            
            <h2 className="text-lg font-bold mb-2">This is what I realize after 16 years of heavy depression</h2>
            <div className="flex items-center justify-center">
            <img 
            className=" py-2 mb-2 w-150"
            src="https://graciousquotes.com/wp-content/uploads/2023/09/Depression-isnt-a-war-you-win.-Its-a-battle-you-fight-every-day.-Shaun-David-Hutchinson.jpg" alt="img"
            />
            </div>
            
            <div className="pl-1 border-l-2 border-pink-400 text-sm text-gray-800">
              I tried every single thing for so many years. I became a runner. Got tons of sun. Had cold showers almost every day. Found purpose. Found meaning. Changed my thinking. Even CBT worksheets. Believed in the future. Find hope. All of it.
              At some point I finally realized none of it did shit. The moment it got quiet, how I truly felt would show up; deep sadness for no reason. It was all self-gaslighting and repressing. It took so many years but I finally realize I'm not creating the depression, it's not my fault, and it's so relieving to realize I'm not the one doing it.
              I realized even the negative thoughts is a symptom of depression and you can't think different your way out of depression.
            </div>
          </div>
          {/* post 2 */}
          <div className="bg-gray-100 rounded-lg p-6 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-purple-400 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-900">u</span>
              </div>
              <span className="text-xs text-gray-800 font-semibold">Mrintresting-234</span>
              <span className="text-xs text-gray-800">7 hr. ago</span>
              <span className="bg-gray-800 text-xs px-2 py-1 rounded font-bold text-gray-300 ml-2">Giving Advice</span>
            </div>
            <h2 className="text-lg font-bold mb-2">What is the one thing that has helped you most in dealing with anxiety?</h2>
            
            <div className="pl-1 border-l-2 border-pink-400 text-sm text-black">
              This is going to sound really dumb but it’s helped me a lot and it’s a good trick my therapist taught me. When I’m starting to get really bad anxiety (I always have anxiety but I use this mostly when I’m having panic attacks or it’s really bad) I start thinking of names that start with every letter (I’ll sometimes do objects if I can’t think of a name) and it distracts me from whatever it is that is making me anxious and really helps me to calm down and not panic so much.
            </div>
          </div>
          {/* post 3 */}    
          <div className="bg-gray-100 rounded-lg p-6 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-purple-400 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-900">u</span>
              </div>
              <span className="text-xs text-gray-800 font-semibold"></span>
              <span className="text-xs text-gray-800">9 hr. ago</span>
              <span className="bg-gray-800 text-xs px-2 py-1 rounded font-bold text-gray-300 ml-2">Giving Advice</span>
            </div>
            <h2 className="text-lg font-bold mb-2">Chronic stress recovery stories</h2>
            <div className="flex items-center justify-center">
            <img 
            className=" py-2 mb-2 w-160"
            src="https://static-cse.canva.com/blob/1142880/quotesforstress_markblack.jpg" alt="img"
            />
            </div>
            
            <div className="pl-1 border-l-2 border-pink-400 text-sm text-black">
              I have undergone 3 years of chronic stress and I finally have been able to change my lifestyle and remove the stressors in my life. It was so bad that my hair was falling out, I wasn't sleeping, I lost 20lbs, and my mental health deteriorated. With the doctors help I have addressed my health issues but I still feel tense and on edge sometimes. I developed fears of situations that were the hardest for me but I don't let it prevent me from living. I guess I just want to know if anyone else has been in this situation and what did you do during recovery? Also, how long were you under this amount of stress and how long did it take to recover?
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-96">
          <div className="bg-gray-100 rounded-lg px-6 py-5 mb-6">
            <div className="font-bold text-lg mb-1">Anxiety Help</div>
            <div className="text-black text-sm mb-3">
              A place to share your thoughts, concerns, and advice related to anxiety. Please seek professional medical help if you are in crisis.
            </div>
            <div className="flex gap-2 text-xs mb-2">
              <span>Created Dec 8, 2013</span>
              <span>Public</span>
            </div>
            <div className="flex gap-6 mt-2 text-xs text-black">
              <span>67K <span className="text-gray-800">Weekly visitors</span></span>
              <span>1.2K <span className="text-gray-800">Weekly contributions</span></span>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg px-6 py-5">
            <div className="font-bold text-lg mb-2">R/ANXIETYHELP RULES</div>
            <ul className="space-y-2 text-sm text-black">
              <li>1. Posts regarding suicide or self harm are not allowed.</li>
              <li>2. No questions asking for medical advice.</li>
              <li>3. No YouTube/Spotify links.</li>
              <li>4. No religious content or political content allowed.</li>
              <li>5. No personal attacks or trolling.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;
