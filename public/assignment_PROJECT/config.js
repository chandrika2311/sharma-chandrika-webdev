/**
 * Created by chandrika2311 on 2/7/17.
 */
(function() {
    angular
        .module("MentorStudentApp")/** One argument means we are reading the document*/
        .config(Config);
    function Config($routeProvider, $httpProvider) {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        $routeProvider
            .when("/", {
                templateUrl: "views/Home/Home.view.client.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/mentor/login", {
                templateUrl: "views/Profile/Template/MentorTemplate/Mentor.login.view.client.html",
                controller: "MentorLoginController",
                controllerAs: "model" /** Design Pattern: controller can be refered by this name, this is used
                                         so no ambiguity between any data variables **/
            })
            .when("/mentor/register", {
                templateUrl: "views/Profile/Template/MentorTemplate/Mentor.register.view.client.html",
                controller: "MentorRegisterController",
                controllerAs: "model" /** Design Pattern: controller can be refered by this name, this is used
                 so no ambiguity between any data variables **/
            })

            .when("/mentor", {
                templateUrl: "views/Profile/Template/MentorTemplate/Mentor.profile.view.client.html",
                controller: "MentorProfileController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/mentor/update", {
                templateUrl: "views/Profile/Template/MentorTemplate/Mentor.update.profile.view.client.html",
                controller: "MentorProfileController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/student/login", {
                templateUrl: "views/Profile/Template/StudentTemplate/Student.login.view.client.html",
                controller: "StudentLoginController",
                controllerAs: "model" /** Design Pattern: controller can be refered by this name, this is used
                 so no ambiguity between any data variables **/
            })
            .when("/student/register", {
                templateUrl: "views/Profile/Template/StudentTemplate/Student.register.view.client.html",
                controller: "StudentRegisterController",
                controllerAs: "model" /** Design Pattern: controller can be refered by this name, this is used
                 so no ambiguity between any data variables **/
            })

            .when("/student", {
                templateUrl: "views/Profile/Template/StudentTemplate/Student.profile.view.client.html",
                controller: "StudentProfileController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }

            })


            .when("/student/update", {
                templateUrl: "views/Profile/Template/StudentTemplate/Student.update.profile.view.client.html",
                controller: "StudentUpdateProfileController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/admin/update/user/:uid", {
                templateUrl: "views/Profile/Template/AdminTemplate/AdminUpdateUser.view.client.html",
                controller: "AdminManageUsers",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/admin/update/course/:cid", {
                templateUrl: "views/Profile/Template/AdminTemplate/AdminUpdateCourse.view.client.html",
                controller: "AdminManageUsers",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/admin/update/project/:pid", {
                templateUrl: "views/Profile/Template/AdminTemplate/AdminUpdateProject.view.client.html",
                controller: "AdminManageUsers",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })

            .when("/student/projects", {
                templateUrl: "views/Projects/ProjectList/List/Project.List.student.view.client.html",
                controller: "ProjectListController",
                controllerAs:"model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/student/projects/:pid", {
                templateUrl: "views/Projects/ProjectList/List/Project.Details.Student.view.client.html",
                controller: "ProjectDetailsController",
                controllerAs:"model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/student/course", {
                templateUrl: "views/NavigateStudentForCourseProject/CourseListForStudent/course.list.view.client.html",
                controller : "CourseListController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }

            })
            .when("/navigate/courseSearch/course/:cid", {
                templateUrl: "views/NavigateStudentForCourseProject/NavigatingCourseForStudent/Course.details.view.client.html",
                controller : "NavigateCourseController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }

            })
            .when("/navigate/:uid", {
                templateUrl: "views/NavigateStudentForCourseProject/InitialNavigationStudentForCourseMentor/navigate_course_prof.html",
                controller: "NavigationController",
                controllerAs:"model",
                resolve: { loggedin: checkLoggedin }
            })

            .when("/navigate/:uid/professorSearch", {
                templateUrl: "views/NavigateStudentForCourseProject/NavigatingMentorForStudent/navigate_professor.view.client.html"

            })

            .when("/navigate/:uid/courseSearch", {
                templateUrl: "views/NavigateStudentForCourseProject/NavigatingCourseForStudent/NavigateCourse.view.client.html",
                controller : "NavigateCourseController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }

            })
            .when("/navigate/courseSearch", {
                templateUrl: "views/NavigateStudentForCourseProject/NavigatingCourseForStudent/NavigateCourse.view.client.html",
                controller : "NavigateCourseController",
                controllerAs: "model"

            })


            .when("/mentor/createProject", {
                    templateUrl: "views/Projects/CreateProject/Create.Project.Mentor.view.client.html",
                    controller: "CreateProjectController",
                    controllerAs:"model",
                resolve: { loggedin: checkLoggedin }
                })
            .when("/mentor/projects", {
                templateUrl: "views/Projects/ProjectList/List/Project.List.mentor.view.client.html",
                controller: "ProjectListController",
                controllerAs:"model",
                resolve: { loggedin: checkLoggedin }

            })


            .when("/mentor/projects/:pid", {
                templateUrl: "views/Projects/ProjectList/ProjectDetails/Project.Details.Mentor.view.client.html",
                controller: "ProjectUpdateController",
                controllerAs:"model",

                resolve: { loggedin: checkLoggedin }
            })
            .when("/mentor/Student/List", {
                templateUrl: "views/Profile/Template/StudentTemplate/StudentListforMentor.view.client.html",
                controller: "MentorProfileController",
                controllerAs:"model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/student/mentor/List", {
                templateUrl: "views/Profile/Template/MentorTemplate/MentorListforStudents.view.client.html",
                controller: "StudentProfileController",
                controllerAs:"model",
                resolve: { loggedin: checkLoggedin }
            })

            .when("/student/:uid/navigate/mentorSearch", {
                templateUrl: "views/NavigateStudentForCourseProject/NavigatingMentorForStudent/navigate_professor.view.client.html",
                controller: "NavigationMentorController",
                controllerAs:"model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/student/:uid/navigate/mentorSearch/:mid", {
                templateUrl: "views/NavigateStudentForCourseProject/StudentNavigationOfMentorForProject/Mentor_details.view.client.html",
                controller: "MentorDetailsController",
                controllerAs:"model"

            })
            .when("/student/:uid/navigate/mentorSearch/:mid/project/:pid", {
                templateUrl: "views/NavigateStudentForCourseProject/StudentNavigationOfMentorForProject/MentorProjectView.view.client.html",
                controller: "MentorProjectViewController",
                controllerAs:"model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/mentor/:mid/Application/student/:uid/project/:pid", {
                templateUrl: "views/Profile/Template/StudentTemplate/StudentProfileMentorReview.view.client.html",
                controller: "MentorApprovalController",
                controllerAs:"model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/admin", {
                templateUrl: "views/Profile/Template/AdminTemplate/adminpage.view.client.html",
                controller: "AdminManageController",
                controllerAs:"model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/admin/users", {
                templateUrl: "views/Profile/Template/AdminTemplate/AdminManageUsers.view.client.html",
                controller: "AdminManageController",
                controllerAs:"model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/admin/projects", {
                templateUrl: "views/Profile/Template/AdminTemplate/AdminManageProjects.view.client.html",
                controller: "AdminManageController",
                controllerAs:"model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/admin/project/:pid", {
                templateUrl: "views/Profile/Template/AdminTemplate/AdminUpdateProject.view.client.html",
                controller: "AdminManageProject",
                controllerAs:"model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/admin/courses", {
                templateUrl: "views/Profile/Template/AdminTemplate/AdminManageCourses.view.client.html",
                controller: "AdminManageController",
                controllerAs:"model",
                resolve: { loggedin: checkLoggedin }
            })
            .when("/admin/course/:cid", {
                templateUrl: "views/Profile/Template/AdminTemplate/AdminUpdateCourse.view.client.html",
                controller: "AdminManageCourseController",
                controllerAs:"model",
                resolve: { loggedin: checkLoggedin }
            })

            ;
    }})();
var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();
    $http.get('/api/loggedin').success(function(user) {
        console.log("inside chek logged in",user);

        $rootScope.errorMessage = null;
        if (user !== '0') {
            $rootScope.currentUser = user;
            deferred.resolve();
        } else {
            deferred.reject();
            $location.url('/');
        }
    });
    return deferred.promise;
};
var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
{
    var deferred = $q.defer();

    $http.get('/api/loggedin').success(function(user)
    {
        console.log("inside chek logged in",user);
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0')
        {
            $rootScope.currentUser = user;
            $location.url('/');
        }
        deferred.resolve();
    });

    return deferred.promise;
};


