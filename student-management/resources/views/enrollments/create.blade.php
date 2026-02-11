@extends('layouts.app')

@section('title', 'Create Enrollment')

@section('content')
<div class="card">
    <h2>Create New Enrollment</h2>

    @if($errors->any())
        <div class="alert alert-error">
            <ul>
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('enrollments.store') }}" method="POST">
        @csrf

        <div class="form-group">
            <label for="student_id">Student *</label>
            <select id="student_id" name="student_id" class="form-control" required>
                <option value="">Select a student</option>
                @foreach($students as $student)
                    <option value="{{ $student->id }}" {{ old('student_id') == $student->id ? 'selected' : '' }}>
                        {{ $student->name }} ({{ $student->enrollment_number }})
                    </option>
                @endforeach
            </select>
        </div>

        <div class="form-group">
            <label for="course_id">Course *</label>
            <select id="course_id" name="course_id" class="form-control" required>
                <option value="">Select a course</option>
                @foreach($courses as $course)
                    <option value="{{ $course->id }}" {{ old('course_id') == $course->id ? 'selected' : '' }}>
                        {{ $course->code }} - {{ $course->name }}
                    </option>
                @endforeach
            </select>
        </div>

        <div class="form-group">
            <label for="enrollment_date">Enrollment Date *</label>
            <input type="date" id="enrollment_date" name="enrollment_date" class="form-control" value="{{ old('enrollment_date', date('Y-m-d')) }}" required>
        </div>

        <div class="form-group">
            <label for="grade">Grade</label>
            <input type="text" id="grade" name="grade" class="form-control" value="{{ old('grade') }}" placeholder="e.g., A, B+, C">
        </div>

        <div class="actions">
            <button type="submit" class="btn btn-success">Create Enrollment</button>
            <a href="{{ route('enrollments.index') }}" class="btn btn-danger">Cancel</a>
        </div>
    </form>
</div>
@endsection
