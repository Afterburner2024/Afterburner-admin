import { useQuery } from '@tanstack/react-query';
import {
  getUserProjects,
  getUserParticipatedProjects,
  getUserStudies,
  getUserParticipatedStudies,
  getUserQuestions,
} from '../utils/apiClient';
import type { Project, StudyGroup, Question } from '../types/responseTypes';

export const useMemberActivity = (userId: string | undefined) => {
  const {
    data: userProjects = [],
    isLoading: isLoadingUserProjects,
    error: userProjectsError,
  } = useQuery<Project[], Error>({
    queryKey: ['user-projects', userId],
    queryFn: () => getUserProjects(userId!),
    enabled: !!userId,
  });

  const {
    data: participatedProjects = [],
    isLoading: isLoadingParticipatedProjects,
    error: participatedProjectsError,
  } = useQuery<Project[], Error>({
    queryKey: ['user-participated-projects', userId],
    queryFn: () => getUserParticipatedProjects(userId!),
    enabled: !!userId,
  });

  const {
    data: userStudies = [],
    isLoading: isLoadingUserStudies,
    error: userStudiesError,
  } = useQuery<StudyGroup[], Error>({
    queryKey: ['user-studies', userId],
    queryFn: () => getUserStudies(userId!),
    enabled: !!userId,
  });

  const {
    data: participatedStudies = [],
    isLoading: isLoadingParticipatedStudies,
    error: participatedStudiesError,
  } = useQuery<StudyGroup[], Error>({
    queryKey: ['user-participated-studies', userId],
    queryFn: () => getUserParticipatedStudies(userId!),
    enabled: !!userId,
  });

  const {
    data: userQuestions = [],
    isLoading: isLoadingUserQuestions,
    error: userQuestionsError,
  } = useQuery<Question[], Error>({
    queryKey: ['user-questions', userId],
    queryFn: () => getUserQuestions(userId!),
    enabled: !!userId,
  });

  const isLoading =
    isLoadingUserProjects ||
    isLoadingParticipatedProjects ||
    isLoadingUserStudies ||
    isLoadingParticipatedStudies ||
    isLoadingUserQuestions;

  const error =
    userProjectsError ||
    participatedProjectsError ||
    userStudiesError ||
    participatedStudiesError ||
    userQuestionsError;

  return {
    userProjects,
    participatedProjects,
    userStudies,
    participatedStudies,
    userQuestions,
    isLoading,
    error,
  };
};
