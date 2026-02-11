@extends('layouts.app')

@section('title', 'Students List')

@section('content')
<div class="card">
    <div class="header-actions">
        <h2>Students</h2>
        <a href="{{ route('students.create') }}" class="btn btn-primary">Add New Student</a>
    </div>

    @if($students->count() > 0)
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Enrollment Number</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach($students as $student)
                <tr>
                    <td>{{ $student->id }}</td>
                    <td>{{ $student->name }}</td>
                    <td>{{ $student->email }}</td>
                    <td>{{ $student->enrollment_number }}</td>
                    <td>{{ $student->phone ?? 'N/A' }}</td>
                    <td>
                        <div class="actions">
                            <a href="{{ route('students.show', $student) }}" class="btn btn-primary">View</a>
                            <a href="{{ route('students.edit', $student) }}" class="btn btn-warning">Edit</a>
                            <form action="{{ route('students.destroy', $student) }}" method="POST" style="display: inline;">
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
            {{ $students->links() }}
        </div>
    @else
        <p>No students found. <a href="{{ route('students.create') }}">Add a new student</a></p>
    @endif
</div>
@endsection
