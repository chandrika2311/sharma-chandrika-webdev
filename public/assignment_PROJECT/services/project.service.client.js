/**
 * Created by chandrika2311 on 4/15/17.
 */

(function () {
    angular
        .module("MentorStudentApp")
        .factory("ProjectService",ProjectService );

    function ProjectService($http) { //helps in creation interaction with any server.

        var api = {
            "removeProjectfromApplication":removeProjectfromApplication,
            "addProjectToStudentWorking":addProjectToStudentWorking,
            "addStudentApplication":addStudentApplication,
            "createProject": createProject,
            "findProjectById": findProjectById,
            "findAllProjects": findAllProjects,
            "updateProject": updateProject,
            "deleteProject": deleteProject
        };
        return api;
        /** this API object has attributes if MentorService instance is used it will return the object of api.
         this api object is bound with local function**/
        function createProject(mentorId, project) {
            return $http.post("/api/mentor/"+mentorId+"/project", project);
        }

        // function findProjectByusername(username) {
        //     return $http.get("/api/project?username="+username);
        // }
        function findProjectById(projectId){
            return $http.get("/api/project/"+projectId)

        }


        function updateProject(projectId, newProject) {

            return $http.put("/api/project/"+projectId,newProject);
        }
        function findAllProjects() {
            return $http.get('/api/allProjects');

        }

        function deleteProject(project) {
            var project_id = project.id;
            console.log("project id at service client",project_id);
            return $http.delete('/api/project/'+project_id,project);
        }
        function addStudentApplication(studentId, projectId) {
            console.log("client add project");
            var student_id = {_id: studentId};
            return $http.post("/api/project/application/"+projectId,student_id);

        }
        function addProjectToStudentWorking(studentId, projectId) {
            var student_id = {_id: studentId};
            return $http.post("/api/project/working/"+projectId,student_id);

        }
        function removeProjectfromApplication(studentId,projectId,mentorId) {
            var student_id = {_id: studentId};
            return $http.post("/api/project/reject/"+projectId,student_id);
            
        }
    }
})();
