--
-- PostgreSQL database dump
--

\restrict YMeEGCz7ZC8PnNA8Qea81ZGuiXxK6kUTr6RjBaSWZmVg920DLsbn0glUY1HEgPc

-- Dumped from database version 17.6 (Debian 17.6-1.pgdg12+1)
-- Dumped by pg_dump version 17.6 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: trialpost_e7kn_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO trialpost_e7kn_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: submissions; Type: TABLE; Schema: public; Owner: trialpost_e7kn_user
--

CREATE TABLE public.submissions (
    id integer NOT NULL,
    text text NOT NULL,
    images text[] NOT NULL,
    date timestamp without time zone NOT NULL
);


ALTER TABLE public.submissions OWNER TO trialpost_e7kn_user;

--
-- Name: submissions_id_seq; Type: SEQUENCE; Schema: public; Owner: trialpost_e7kn_user
--

CREATE SEQUENCE public.submissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.submissions_id_seq OWNER TO trialpost_e7kn_user;

--
-- Name: submissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: trialpost_e7kn_user
--

ALTER SEQUENCE public.submissions_id_seq OWNED BY public.submissions.id;


--
-- Name: submissions id; Type: DEFAULT; Schema: public; Owner: trialpost_e7kn_user
--

ALTER TABLE ONLY public.submissions ALTER COLUMN id SET DEFAULT nextval('public.submissions_id_seq'::regclass);


--
-- Data for Name: submissions; Type: TABLE DATA; Schema: public; Owner: trialpost_e7kn_user
--

COPY public.submissions (id, text, images, date) FROM stdin;
1	test pg	{story.jpg,"Faun bear inspired by Narnia, Girbius.jpeg"}	2025-09-27 18:48:30.924
2	phone submission test	{IMG_20250911_0017.jpg,IMG_9877.jpg}	2025-09-27 18:50:34.172
4	halloween	{IMG_20250911_0015.jpg,"sticker 1.png"}	2025-09-28 23:23:58.03
7	Two bad bitches with some gaunt little gobblers. In the street they meet a busted hoe with that wiiiiiiide lower face. Something they can’t fathom. Something they can’t ever understand. At home, following their magazine photoshoot gig, they pool their coke money to pull an ad on Instagram. A study will happen. A research study. They will search for meaning in the wide lower face. It’s an act of genuine care and curiosity. These two bitches are too dumb to do it out of maliciousness. But they will find out.	{IMG_8017.jpeg,IMG_3801.PNG}	2025-10-02 03:00:24.171
8	Burning sensations whilst you pee:\nUrine trouble.\n\nMephedrone-induced psychosis, no money and no formal training, and a uniquely German inclination towards the scatological:\nUrine town.\n\nLove and light is thrust down on me with the force of a chemical-laden golden shower:\nUrine luck!!!!!	{ali.jpg,scan2.jpg}	2025-10-02 13:04:34.48
13	Are you looking for a challenge? Are you looking for something fun to do with your kids on that slow kind of sunday where no amount of drinking can seem to fill up that pesky empty time? Buy our Buzelau Ghour of the Endless Maze child transmogrification device! :D Turn your kid into sponglebob and you can spend the rest of the day turning them back! Fun DIY project.. repair the kids! Yes if they aren't broken then you must do something to change that. Then yuo can repair them. If you change them you can repair them. You can repair anything! It's a creative challenge. And if they don't turn back, um. There'll be something in the Book about that.	{"sticker 1.png","Repair Manifesto.jpeg"}	2025-10-02 23:38:23.981
14	Whether the mask covers your whole face or only the upper eyes stems from a number of contributing factors. What's the ancillary masseter length? Of what? What are you talking about? What's the longest you've held your breath for? Have you seen the MET>> heard the Beatles. Did you look at the reviews for the Magical Mystery Tour as you waited in the bathroom for your brother to enter the coffee shop, were you taken back to the Long Boat? Where you tried coffee for the first time. The last time you were in a room with both of your brothers was on The long boat. Why wear yellow shoes with a blue bikini? And to pair it with a white mask? You know that mother will only take this as an opportunity to point out the fact that your teeth are closer in color to the shoes than to the mask. You laid yourself bear for her incisive critique. Incisor critique. The Family Guides itself in directions unbeknownst to itself, the internal machinations too complex to model after the cybernetic systems which once sought to capture its essence. Relational cybernetic therapy never worked for you anyways, your system was never self regulating. You always operated more like a bomb eternally ignited, yet on the precipice of completing the chain of physio-chemical reactions that would release its potential energy in all its destructive capacity onto whoever happened to be strolling that park that morning. If the Event of the bomb accelerated its speed by an infinite amount, what would be noticed other than a slight rustling in the wind, and an absence of matter?	{"512Y4tuQ+xL._UF1000,1000_QL80_.jpg",IMG_20250911_0016.jpg}	2025-10-02 23:51:45.623
15	Sign - Signifier. Something lays between the two. Covfefe & Ryker. Appearance of Ryker. Not Ryker. Ryker? Coffee!	{covfefe.jpg,IMG_0532.jpg}	2025-10-02 23:55:40.333
17	i can't keep searching for her... i know it's not good for me...	{most-beautiful-girl-in-the-world-wikimedia-search.png,"sticker 1.png"}	2025-10-03 00:33:06.241
18	all that’s known will be unknown but life as we know it will always continue	{IMG_0538.PNG,nathan-botanic-garden.png}	2025-10-03 01:00:43.263
19	Blue mermaid\nBioluminescent\n\nIn her underwater heaven\nCollecting pearls to adorn herself\nNone glow quite like her skin under the moonlight\n\nDivers from Bahrain would plunge to uncharted depths for her\nBut they could never catch her\nAnd this pearl is not for sale\n\nFreely she glides through the crystal waters\nA forager by day\nA sea lantern by night\n\nIn every shade, she knows it true\nHow wonderful it is to be blue	{kelela.jpg,"download copy.jpg"}	2025-10-03 02:22:51.625
23	Me my dad and my stepdad	{iphoneone.JPG,NQlsn49b0R.png}	2025-10-03 13:28:27.588
9	after years of terrorizing music, institution, and peace, the help have split ways. We don’t know what went on behind those rustic hotel doors that led to their traumatic break up, but we do know is that they’ve both gone solo under the pseudonyms Libety and Tranny. The fanbase is distraught, fractured, and confused. No where is this fracture more felt than in middle america, where in every cul de sac, rv park, and street corner, one can find signs like this one, created by a lost souls trying to navigate the hardest divorce of their lives	{crystalcastles.png,IMG_3980.JPG}	2025-10-02 18:10:01.977
16	S(h)o(e)lange	{shoethrow.jpg,solo.jpeg}	2025-10-03 00:24:09.692
24	From Ohio to Connecticut she couldn’t escape the changing versions of herself. She found comfort only in the online world. There, she could be anyone. There, she could be her.	{FFE866AC-D6B7-4364-93B4-ECB140449ADA.jpg,"download copy.jpg"}	2025-10-03 14:13:57.398
6	whiffing my hands after playing in it.	{bjorkdebut.png,choli.png}	2025-10-02 00:45:02.189
3	mark-test	{predicatelogic.jpg,IMG_5913.PNG}	2025-09-27 19:02:28.572
21	Ice cream serve sunil	{weepingmerigue.png,31327DC8-CC5D-46BC-BB9B-A8A66433DD4A.jpg}	2025-10-03 10:30:13.111
22	I’ve been intercepted	{IMG_9877.jpg,"Re-Logic masterpiece; its lovecraftian lore_.jpeg"}	2025-10-03 10:30:51.267
25	let me out let me out let me out let me out	{womanfleeing.jpg,FFE866AC-D6B7-4364-93B4-ECB140449ADA.jpg}	2025-10-03 17:48:44.405
26	fools	{sticker5-6.png,cns.jpeg}	2025-10-03 17:51:26.516
27	I felt i was ab to sneeze and then took my hands and then covered my mouth with them. Now I don't have to sneeze anymore. :/	{redhair.jpeg,bjorkdebut.png}	2025-10-03 18:22:05.836
28	My menagerie grows. Plasticine and glossed. All that has been and ever will be can be neatly sorted, categorized, taken care of. Nothing escapes the soft brush of my tenderly watchful gaze. All will be sorted. Bio-luminescent forms of glossed fishies and geomorphological land masses. The once superheated restless clashing of tectonic crusts lays now suspended in a cool, still and quiet animation. Geneolagies of bipedal furries sorted according to whatever path in life they chose to wander. All here and accessible to me and me only :3 yay	{internetnails.jpeg,cns.jpeg}	2025-10-03 18:28:02.766
29	Why was the artefact of birth presented to the viewer before the documenation of death? The turn away, hunched and slouching towards whatever infernal Unterwelt spongeborg is heading to. Why did we need to see that first? When he was born, he couldn't see the walls, they stretched out to infinity. As he aged they narrowed. He arrived at the end of the hallway and the lynx tells him you should've ran the other way. Now he turns	{compromisedspongebob.jpg,buildabear.jpg}	2025-10-03 18:34:37.612
30	rouge state	{IMG_8397.png,shoethrow.jpg}	2025-10-06 15:51:19.378
31	i honestly don't know wtf going on either one I am so sorry	{oldnavy.jpeg,IMG_20250911_0012.jpg}	2025-10-06 16:16:45.83
32	both of these pictures remind me of my amazing beautiful girlfriend Liz to a different extents the first one more so because this is the album by kelela that she really likes and we've listened to many of the tracks together in the car multiple times so even just seeing the album makes me think about some good times and good memories that I've spent with her The other one a little bit less so because it's not really quite her style and I'm sorry but they're close she likes are a lot cuter than this one but it does remind me of her because she really likes stickers and is always taking the extra time and attention to detail to make little aspects of her life more cute and enjoyable with things like cat stickers and that's something that I really admire because it might seem something simple like a sticker but it's bringing a level of beauty to an otherwise mundane objects and I think a lot of the times we discount the value of things like that because it can really improve your mood and how you look at things to just have each little item especially useful ones in your life have some aspect of joy or beauty to them that it would not otherwise have.	{kelela.jpg,catsweater.JPG}	2025-10-06 16:33:59.897
33	When I was but a young child in the Philippines. Me and the family were playing some good old card games. I was sitting under a big zapper and a massive flying insect dropped into my ear. I heard the deep frantic thrumming of its wings buzz in my ear and felt its frantic plea to come to terms with its demise. I jumped and screamed in horror. Forever horrified by the experience. What was a surprising shock to me was another creatures existence ceased on the cold tiled floor.	{swirl.jpg,IMG_2445.PNG}	2025-10-06 17:27:11.602
34	The girls of silky satin gowns and delicate jewelry adornished dearies,, the path they take is simple but desperate. The boat wobbles beneath their wigs , they cling together so the water does not splash and sully their pristine playthings. Soon enough they would reach the playtime dungeon, where things that are pure become tainted and toyed with. The doorman will choose one deary— the dearest, to enter and the rest must be forsaken. For it is the purest and cleanest deary who will be the dearest. And what becomes of her she can only imagine, her spirit simply ignited by the dungeons sin. Transforming her in ways that can only be understood by the never undone. Corsetry and chastity she knows well but the wild dimly lit dungeon reduces her to but a silhouette— her power unleashed. Her form melted to meltiness and reconstructed in vibrannce. Like a donut. Like a deary.	{tara.JPG,kelela.jpg}	2025-10-06 20:00:58.484
35	gosh i just love your new cat dardigan darling but why are you a tree?	{e5d18edd-a5f1-4540-bdee-98efbd437a38_screenshot.jpg,catsweater.JPG}	2025-10-06 20:22:28.024
36	me and bro	{maury.jpg,"sticker 2.png"}	2025-10-06 20:23:21.243
37	peeping bob	{yellowdress.jpeg,spongebobcube.jpg}	2025-10-06 20:25:00.937
38	Roop risks her life while diving to the deepest depths, and though her oxygen is depleting she gently caress the seafloor with her weathered, knobby fingers. She no longer needs her oxygen tank, for Allah will guide this storied woman through the most testing trials and tribulations. She tries to swim back to the surface, following the glistening sun, but Allah draws her back, slinking back as if pulled by a silver white cord, she is now bound to these frigid and unfeeling waters. There is something beneath the seafloor, some precious commodity to which Allah will guide her,the true reason for Roop's transversal of these desolate landscapes. Suddenly she is blinded by Allah and his word, a prescient message has been delivered. Transfixed in a beam of pure light energy she is called to her divine enterprise. Roop, my child, it is here that you must frack.	{"download copy.jpg",rupaulallah.JPG}	2025-10-06 22:01:41.743
40	Something rockstar but also high fashion	{swimming.jpeg,"ascii-art (3).jpeg"}	2025-10-07 01:36:17.348
41	my cpu too small :(	{IMG_0405.JPG,IMG_20250911_0003.jpg}	2025-10-09 00:02:44.874
42	It was December, she was running from something, not even sure if it was a person or a robot or even worse one of them… But what she was sure of was she had read it, and it changed everything. She felt herself losing breath but she knew she couldn’t it was all going to be over soon…she just had to not forget…it	{pgrh2.jpeg,womanfleeing.jpg}	2025-10-11 00:08:31.621
\.


--
-- Name: submissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: trialpost_e7kn_user
--

SELECT pg_catalog.setval('public.submissions_id_seq', 42, true);


--
-- Name: submissions submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: trialpost_e7kn_user
--

ALTER TABLE ONLY public.submissions
    ADD CONSTRAINT submissions_pkey PRIMARY KEY (id);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES TO trialpost_e7kn_user;


--
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES TO trialpost_e7kn_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS TO trialpost_e7kn_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO trialpost_e7kn_user;


--
-- PostgreSQL database dump complete
--

\unrestrict YMeEGCz7ZC8PnNA8Qea81ZGuiXxK6kUTr6RjBaSWZmVg920DLsbn0glUY1HEgPc

