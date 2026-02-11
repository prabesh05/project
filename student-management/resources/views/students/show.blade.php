@extends('layouts.app')

@section('title', 'Student Details')

@section('content')
<div class="card">
    <div class="header-actions">
        <h2>Student Details</h2>
        <div class="actions">
            <a href="{{ route('students.edit', $student) }}" class="btn btn-warning">Edit</a>
            <a href="{{ route('students.index') }}" class="btn btn-primary">Back to List</a>
        </div>
    </div>

    <table>
        <tr>
            <th style="width: 200px;">ID</th>
            <td>{{ $student->id }}</td>
        </tr>
        <tr>
            <th>Name</th>
            <td>{{ $student->name }}</td>
        </tr>
        <tr>
            <th>Email</th>
            <td>{{ $student->email }}</td>
        </tr>
        <tr>
            <th>Enrollment Number</th>
            <td>{{ $student->enrollment_number }}</td>
        </tr>
        <tr>
            <th>Phone</th>
            <td>{{ $student->phone ?? 'N/A' }}</td>
        </tr>
        <tr>
            <th>Date of Birth</th>
            <td>{{ $student->date_of_birth?->format('M d, Y') ?? 'N/A' }}</td>
        </tr>
        <tr>
            <th>Address</th>
            <td>{{ $student->address ?? 'N/A' }}</td>
        </tr>
        <tr>
            <th>Created At</th>
            <td>{{ $student->created_at->format('M d, Y H:i') }}</td>
        </tr>
        <tr>
            <th>Updated At</th>
            <td>{{ $student->updated_at->format('M d, Y H:i') }}</td>
        </tr>
    </table>

    @if($student->enrollments->count() > 0)
        <h3 style="margin-top: 2rem;">Enrolled Courses</h3>
        <table>
            <thead>
                <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Enrollment Date</th>
                    <th>Grade</th>
                </tr>
            </thead>
            <tbody>
                @foreach($student->enrollments as $enrollment)
                <tr>
                    <td>{{ $enrollment->course->code }}</td>
                    <td>{{ $enrollment->course->name }}</td>
                    <td>{{ $enrollment->enrollment_date->format('M d, Y') }}</td>
                    <td>{{ $enrollment->grade ?? 'Not graded' }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    @else
        <p style="margin-top: 2rem;">This student is not enrolled in any courses yet.</p>
    @endif
</div>
@endsection
