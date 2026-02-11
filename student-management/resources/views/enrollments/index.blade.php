@extends('layouts.app')

@section('title', 'Enrollments List')

@section('content')
<div class="card">
    <div class="header-actions">
        <h2>Enrollments</h2>
        <a href="{{ route('enrollments.create') }}" class="btn btn-primary">Create New Enrollment</a>
    </div>

    @if($enrollments->count() > 0)
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Student</th>
                    <th>Course</th>
                    <th>Enrollment Date</th>
                    <th>Grade</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach($enrollments as $enrollment)
                <tr>
                    <td>{{ $enrollment->id }}</td>
                    <td>{{ $enrollment->student->name }}</td>
                    <td>{{ $enrollment->course->name }}</td>
                    <td>{{ $enrollment->enrollment_date->format('M d, Y') }}</td>
                    <td>{{ $enrollment->grade ?? 'Not graded' }}</td>
                    <td>
                        <div class="actions">
                            <a href="{{ route('enrollments.show', $enrollment) }}" class="btn btn-primary">View</a>
                            <a href="{{ route('enrollments.edit', $enrollment) }}" class="btn btn-warning">Edit</a>
                            <form action="{{ route('enrollments.destroy', $enrollment) }}" method="POST" style="display: inline;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger" onclick="return confirm('Are you sure?')">Delete</button>
                            </form>
                        </div>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <div class="pagination">
            {{ $enrollments->links() }}
        </div>
    @else
        <p>No enrollments found. <a href="{{ route('enrollments.create') }}">Create a new enrollment</a></p>
    @endif
</div>
@endsection
