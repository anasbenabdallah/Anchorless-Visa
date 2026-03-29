<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\File;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function index()
    {
        return response()->json(File::all()->groupBy('type'));
    }

    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:pdf,png,jpg|max:4096',
            'type' => 'required|string'
        ]);

        $file = $request->file('file');
        $path = $file->store('uploads', 'public');

        $saved = File::create([
            'name' => $file->getClientOriginalName(),
            'path' => $path,
            'type' => $request->type
        ]);

        return response()->json($saved, 201);
    }

    public function delete($id)
    {
        $file = File::findOrFail($id);
        Storage::disk('public')->delete($file->path);
        $file->delete();

        return response()->json(['message' => 'Deleted']);
    }
}