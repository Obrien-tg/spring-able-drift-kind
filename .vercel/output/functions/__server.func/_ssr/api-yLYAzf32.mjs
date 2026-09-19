import { r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-3dweTO4C.mjs";
import { a as createSsrRpc } from "./router-D2B_2qgz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-yLYAzf32.js
var ROLES = [
	"student",
	"parent",
	"teacher"
];
var getMyProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("d5ad90f07208e023088bf312bd24cd7a47718f23a90d37a1fe01eb1a5338dd7b"));
var saveProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	const displayName = input.displayName.trim();
	if (!displayName) throw new Error("Please enter a name.");
	if (!ROLES.includes(input.role)) throw new Error("Choose a role.");
	return {
		displayName,
		role: input.role,
		gradeLevel: input.gradeLevel?.trim() || null,
		parentEmail: input.parentEmail?.trim() || null
	};
}).handler(createSsrRpc("fe4add55e62c4772ab7b87041d98bf121938732ec0647112da8a786637c2a3df"));
var linkChild = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((email) => email.trim().toLowerCase()).handler(createSsrRpc("1c029567216947b68bc429b327d2cb1e8d2c27a1ff594c8057aa49a1b549f15f"));
var getDashboard = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("fe4d972369369c3ea04b441420cf33af98c7f1315634383a5287c95968470003"));
var listSubjects = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("1b7a1714eaea063e4f32a3ec0bd91ba64abad0de35ee41d3444060aecf0c93a9"));
var listMaterials = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("e3f72aa846ad7232b9d5e7f38c4700c5b928d77a9b6049119025d897ba3fa01f"));
var getMaterial = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("d6b46511569c370c6fc88c46e51dd8e3554de8c808ec173ac9db849e053492e9"));
var markMaterialDone = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("ff34da0a0a060bed067fd996d7b71b330e9b69a66e0dac721dfa71200d9e3f04"));
var savePracticeScore = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("88e5b0daed7d135a95f29a8e6c721361008a0dcd91cb954efa32acd8436c8251"));
var createMaterial = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	if (!input.title.trim() || !input.content.trim()) throw new Error("Title and lesson text are required.");
	return input;
}).handler(createSsrRpc("17d5fa970a12fa2f58ade8d8dc70dd9acba1bd39dbf315c97c4a7fdd27c46b68"));
var listAssignments = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("3e967f10f73add1469d33f7ca7194cba06f86633cf2b6cca7682b974e5807014"));
var submitAssignment = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	const content = input.content.trim();
	if (!content) throw new Error("Write your answer before sending.");
	return {
		assignmentId: input.assignmentId,
		content
	};
}).handler(createSsrRpc("a02569e3c5d8605f48566bdaf175b7affadc4c7e87d272a088864233ecaaa41d"));
var createAssignment = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	if (!input.title.trim()) throw new Error("Give the assignment a title.");
	return input;
}).handler(createSsrRpc("c71ef3d345019e38c9a7051e18ecae7815f92152fa1f51e957fafe7afb1fe576"));
var gradeSubmission = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("aa912b56084e91fd518592814d47bdabb1cc3b98d2d79e4c6760c8be296bae91"));
var listProgress = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("ecddf596387b6f18bbe75d5cb8b7079374cdb70751c1cc177ca1821d31ff8dba"));
var listMessages = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("e263cd93ed8a1f7ca675d2d66a0a4d24536703805ed90f21763a0a363e70b5f5"));
var sendMessage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((content) => content.trim()).handler(createSsrRpc("61e735748bf908063950956c6d8cfbafe998782839d9f65c3f300f1164868bd0"));
var createAnnouncement = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	if (!input.title.trim() || !input.body.trim()) throw new Error("Title and note are required.");
	return {
		title: input.title.trim(),
		body: input.body.trim()
	};
}).handler(createSsrRpc("3bac98e5741efce1f3f67838d8bdae87c7abb5ef071fea5c8f05809191db2a73"));
//#endregion
export { sendMessage as _, getMaterial as a, linkChild as c, listMessages as d, listProgress as f, saveProfile as g, savePracticeScore as h, getDashboard as i, listAssignments as l, markMaterialDone as m, createAssignment as n, getMyProfile as o, listSubjects as p, createMaterial as r, gradeSubmission as s, createAnnouncement as t, listMaterials as u, submitAssignment as v };
