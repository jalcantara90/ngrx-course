import { Course } from './model/course';
import { getCourses, getCoursesSuccess, getCoursesFail } from './course.actions';
import {
  createReducer,
  on,
} from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface CourseState extends EntityState<Course> {
  // additional entities state properties
  error: any;
}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialState: CourseState = adapter.getInitialState({
  // additional entity state properties
  error: null
});

// export interface CourseState {
//   courseList: Course[];
//   error: any;
// }

// export const initialState = {
//   courseList: [],
//   error: null
// };

export const reducer = createReducer(
  initialState,
  // on(getCoursesSuccess, (state, action) => {
  //   return {
  //     ...state,
  //     courseList: action.data,
  //     error: null
  //   };
  // }),
  on(getCoursesFail, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(getCoursesSuccess, (state, action) => adapter.addAll(action.data, state)),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
